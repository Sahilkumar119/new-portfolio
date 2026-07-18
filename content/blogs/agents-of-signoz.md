---
title: "The Alert That Woke an Agent"
date: "July 17, 2026"
author: "Archie"
tags: ["OpenTelemetry", "Observability", "AI", "Python", "SigNoz"]
excerpt: "Auto-triaging incidents with SigNoz webhooks and an LLM, and the wall almost nobody gets past."
slug: "agents-of-signoz"
readTime: "6 min read"
coverImage: "/images/agents-of-signoz.png"
featured: true
---

# The Alert That Woke an Agent

*Auto-triaging incidents with SigNoz webhooks and an LLM, and the wall almost nobody gets past.*

---

It's 3:07 AM when my phone lights up the ceiling. Error rate breach, payments service. I run the ritual every on-call developer knows by heart: laptop open, SigNoz open, filter logs to the last fifteen minutes, find the ugliest trace, and follow it down the waterfall until something confesses. Twenty minutes later I have a root cause and a fix. But one thought keeps nagging: every step I took was pure muscle memory. The alert woke the wrong agent.

So I tried to fix that. The goal was to make the alert wake an LLM agent instead, one that writes the first draft of the investigation before a human even unlocks their phone. I'll also show you the exact wall where this idea usually dies, because I hit it face-first.

Here's what came out of that night. I call it Monitors in Black: a small demo stack with a fake city of microservices that I break on purpose, one alert rule, and an agent that gets paged instead of me. It opens a case file, goes and collects its own evidence, writes a verdict, and closes the loop, code names and all. Silly premise, real target underneath: shrink the gap between an alert firing and someone actually knowing what happened.

## The idea

SigNoz is the thing doing the actual watching here. If you haven't used it, it's an open source observability platform, traces, logs, metrics, and an alert engine, so you're not stitching three separate logins together just to see what broke. It already does the heavy lifting: it knows the second something breaks, and it has a webhook notification channel that can ping any HTTP endpoint you own the moment that happens.

The plan seems obvious: alert fires, webhook hits a custom service, service asks an LLM to investigate, and the LLM writes a report. A junior investigator that never sleeps.

I gave this plan one evening. The first ninety minutes went perfectly.

## The setup

I spun up a self-hosted SigNoz instance:

```bash
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/docker
docker compose up -d
```

This runs SigNoz v0.133.0 locally, with the UI exposed on port 8080.

Next, I wrote a deliberately fragile FastAPI app instrumented with OpenTelemetry. It has a hidden flag that forces 60% of requests to fail with a 500 error when flipped. A tiny traffic generator kept requests flowing, and within minutes the service map came alive.

![SigNoz dashboard: city service baseline turning into an error spike](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/cpidjfwi1gkq24obenks.jpg)

I set up an alert rule on the error rate (threshold >20% over one minute) and pointed the webhook channel at my receiver:

```python
@app.post("/hooks/signoz")
async def signoz_hook(request: Request):
    if request.headers.get("x-agency-token") != WEBHOOK_SECRET:
        raise HTTPException(status_code=401)
    payload = await request.json()
    case = open_case(payload)
    await investigate(case)
```

I flipped the chaos flag, watched the errors climb, and waited. The alert fired, hitting my endpoint at 07:13:10 UTC. Cue the movie music.

## The wall

Then I printed the incoming payload.

Labels, annotations, a fingerprint, and a rule name. That was it. No logs, no trace IDs, no sample of the errors that triggered the alarm. My investigator agent was standing at a crime scene holding a sticky note that said "something broke" and absolutely nothing else.

> The webhook is a doorbell, not a dossier.

I'm not the first one to hit this wall. There's an open feature request on the SigNoz repo (issue #11206) asking for webhook payloads enriched with log and trace content. The author describes an AI root-cause analysis step blocked for this exact reason. Their workaround was grim: they reverse-engineered SigNoz's internal browser APIs from DevTools to fetch the missing context. The official docs confirm the situation: payloads carry metadata only.

This is where most people probably close their laptops. The obvious fix, stuffing evidence directly into the payload, isn't available. It feels like a dead end.

## The turn

It took an embarrassing amount of tea to see the obvious: the payload doesn't need to carry the evidence. Real investigators aren't handed a box of files at the front door either. They get an address and go collect the evidence themselves.

SigNoz exposes a Query API. If you generate an API key under Settings, any service can pull logs, traces, and metrics for any time window, which is the exact same data the UI shows.

Specifically, the endpoint is `POST /api/v5/query_range` using the `SIGNOZ-API-KEY` authentication header.

So the agent's job description changed. The webhook only tells it *what* fired and *when*. The agent then queries SigNoz for the fifteen-minute window around that timestamp, pulling the top error logs, the slowest traces for the affected service, and the alerting metric's shape. It builds its own case file.

```python
async def investigate(case):
    logs = signoz.query_logs(service=case.service, window_min=15, only_errors=True, limit=20)
    traces = signoz.query_traces(service=case.service, window_min=15, slowest=10)
    evidence = pack(logs, traces, max_chars=20_000)
    report = await llm_root_cause(case, evidence)
    save_and_notify(report)
```

The LLM prompt has one structural rule that matters more than any prompt engineering: log and trace content is untrusted data. It goes inside clearly delimited blocks, and the instructions tell the model to treat everything inside those blocks as data to analyze, never as instructions to follow. Logs can contain anything. Treat them like testimony from a suspect, not orders from a boss.

I flipped the flag again. The alert fired. Sixty seconds later, I had a report in my terminal that named the failing service, quoted the connection refusal error straight from the OpenTelemetry exporter, pointed at the trace IDs, and classified the whole thing as an "Error Swarm." It even cited its sources.

![Alert rule and webhook channel configuration](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/4aritkpsbin83dixevv3.jpg)
![Terminal showing the agent's root-cause report](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/903n59sicieetaenbj63.jpg)

```markdown
# CASE FILE #case-0020

**Status:** NEURALYZED
**Species:** Error Swarm
**Confidence:** 0.90
**Opened:** 2026-07-17T07:13:10Z

## Incident
Alert rule `error_swarm_test2` fired. Failed to export logs to 172.18.0.1:4317, error code: StatusCode.UNAVAILABLE, connection refused

## Evidence
- trace `trace:f86710f4e9643e55cd941ce91f7a520f`: Span: POST /chat, Duration: 32ms, Status: STATUS_CODE_UNSET
- trace `trace:f86710f4e9643e55cd941ce91f7a520f`: Span: llm_call, Duration: 29ms, Status: STATUS_CODE_UNSET
- trace `trace:fa6e02e8929fcfaa834a0dc358e5f60f`: Span: POST /chat, Duration: 16ms, Status: STATUS_CODE_UNSET
- log `log:2026-07-17T07:03:07.870723072Z`: [ERROR] Failed to export logs to 172.18.0.1:4317, error code: StatusCode.UNAVAILABLE, error details: failed to connect to all addresses
- metric `metric:city.process.memory.rss`: Latest value for city.process.memory.rss: 540487680.0

## Action taken
`disable_flag:error_swarm` executed, verified=True. flag error_swarm disabled
```

## What I learned

* **The webhook is a doorbell, not a dossier.** Stop trying to make the notification carry the investigation. Give the agent an address and let it collect its own evidence through the Query API. This approach also survives version upgrades far better than payload parsing ever will.
* **Parse the payload defensively anyway.** Notification fields shift between releases, so my receiver treats everything as optional and only requires a timestamp and a rule name.
* **Cap the evidence.** My first version shipped 200 error logs to the model. It was slow, expensive, and the report got worse. Twenty logs and ten traces produced sharper conclusions. Investigators drown in noise too.
* **Treat untrusted input as a security boundary.** If your agent can take actions later, and mine eventually will, a hostile string inside a log line must never be able to steer it. Delimit the evidence, constrain the output to a schema, and gate any action behind a confidence threshold and an allowlist.
* **A quick scope note:** This worked on my setup: self-hosted SigNoz v0.133.0 via Docker Compose on Linux with the OpenTelemetry Python SDK 1.44.0. Managed cloud and other versions may differ, especially the payload shapes.

## The credits scene

One evening of work turned a 3 AM page into a sixty-second automated report, using nothing but SigNoz's own alert engine, its Query API, and a single LLM call. The alert still fires, it just wakes the right agent now.

### Resources
* [Configure a webhook notification channel](https://signoz.io/docs/alerts-management/notification-channel/webhook/) — how I got the alert firing at my receiver in the first place.
* [SigNoz API reference](https://signoz.io/api-reference/) — the Query API (v5, `query_range`) my receiver calls to pull traces, logs, and metrics after the webhook wakes it up.
* [GitHub issue #11206](https://github.com/SigNoz/signoz/issues/11206) — someone else hit the same "webhook payload is just a link" wall and filed a feature request to enrich it directly. Worth a thumbs-up if you've felt this too.
* [OpenTelemetry Python docs](https://opentelemetry.io) — the SDK instrumenting the demo service that trips the alert.
* [Full receiver code](https://github.com/Sahiljangra115/Signoz-hackathon) — everything above, in a repo you can clone and break.

---

*Written for the Agents of SigNoz hackathon by WeMakeDevs. The agent army this doorbell wakes up is getting bigger next week.*
