---
id: 3
title: "Micro-ROS and XRCE-DDS: How ROS2 Fits into Microcontrollers"
date: "May 27, 2026"
author: "Archie"
tags: ["ROS2", "micro-ROS", "Robotics", "Embedded", "UDP", "DDS"]
excerpt: "How do you run a resource-heavy middleware like ROS2 on a tiny microcontroller like an ESP32? Enter micro-ROS and XRCE-DDS: the client-agent bridge that offloads heavy discovery to the host."
slug: "micro-ros-xrce-dds"
readTime: "4 min read"
featured: false
---

While working on a robotics project recently, I ran into a classic problem: **how do you use a comparatively heavy software stack like ROS2 on a microcontroller?** 

If you've built robots before, you know the struggle. You want the advanced navigation, path planning, and ecosystem of ROS2 running on your host PC or SBC (like a Raspberry Pi), but you also need microcontrollers (like the ESP32 or STM32) for low-latency tasks like motor control, sensor readings, and real-time execution.

That's where I discovered **micro-ROS**. But as I dug deeper, I realized the transition from standard ROS2 to microcontroller-friendly ROS2 isn't simple. It requires a complete rethink of how nodes talk to each other.

Here is what I learned about why standard ROS2 can't run on an ESP32, and how a protocol called **Micro XRCE-DDS** solves it.

---

## The Roadblock: Why ROS2 is Too Heavy for Microcontrollers

To understand the problem, we have to look under the hood of standard ROS2. 

Unlike ROS1, which relied on a central master node (`roscore`) for discovery, ROS2 is completely decentralized. It achieves this using a standard called **DDS (Data Distribution Service)**. When ROS2 boots up, nodes use DDS implementations (like FastDDS or CycloneDDS) to dynamically discover other nodes, topics, services, and actions on the network. 

This discovery process uses peer-to-peer multicast communication (Simple Discovery Protocol). Every node maintains its own state of the entire network.

On a laptop, PC, or single-board computer, this discovery and communication overhead is negligible. But on a microcontroller like an ESP32 or an Arduino:
- **RAM constraints**: Microcontrollers usually have less than 512KB of RAM. Keeping a map of the entire DDS network in memory will instantly cause an out-of-memory crash.
- **CPU limitations**: Processing complex XML/DDS discovery packets in real time hogs the CPU, leaving no room for actual real-time motor control loops.

Standard DDS is simply too bloated for eXtremely Resource Constrained Environments.

---

## The Solution: XRCE-DDS to the Rescue

Seeing this restriction, the community asked: *What if we create a DDS-like service designed specifically for extremely low memory usage?*

The answer is **Micro XRCE-DDS** (eXtremely Resource Constrained Environments DDS). 

Instead of forcing the microcontroller to run a full peer-to-peer DDS state machine, XRCE-DDS splits the work using a **Client-Agent architecture**:

1. **The Client (Microcontroller)**: Runs a lightweight micro-ROS library. It doesn't run discovery, it doesn't keep track of the network, and it doesn't speak standard DDS. It only knows how to serialize/deserialize data and send it.
2. **The Agent (Host PC/SBC)**: A much more powerful machine that sits on the standard ROS2 network. It acts as a proxy or "translator" for the client.

```text
┌────────────────────────┐             ┌────────────────────────┐
│     Microcontroller    │   UDP/      │        Host PC         │
│  ┌──────────────────┐  │   Serial    │  ┌──────────────────┐  │
│  │ micro-ROS Client │◄─┼────────────►│  │  micro-ROS Agent │  │
│  └──────────────────┘  │  (XRCE-DDS) │  └────────┬─────────┘  │
└────────────────────────┘             └───────────┼────────────┘
                                                   │ (Standard DDS)
                                                   ▼
                                        🌍 Standard ROS2 Network
```

---

## The Catch: Translation & Transport

Because the Client is so lightweight, it has a couple of quirks:
- **It doesn't discover on its own**: The microcontroller cannot scan the network to find other nodes. It must establish a direct connection to a known Micro-ROS Agent.
- **It doesn't speak standard DDS**: It uses the **XRCE-DDS** protocol, which is highly optimized, compact, and designed to transmit data over simple transport layers like **UDP**, TCP, or even raw Serial (UART).

Because XRCE-DDS and standard DDS speak different languages, the **micro-ROS Agent** sits on the host PC (running natively or inside a Docker container). 

When the microcontroller wants to publish to a topic (e.g., `/sensor_data`):
1. The micro-ROS Client sends a tiny XRCE-DDS message over UDP or Serial to the Agent.
2. The Agent receives the message, translates it into a standard DDS payload, and publishes it to the main ROS2 network.
3. To the rest of the ROS2 nodes, the microcontroller looks like a standard first-class ROS2 node!

---

## Final Thoughts

Micro-ROS and XRCE-DDS are brilliant compromises. By offloading the heavy memory and discovery requirements of DDS onto a host proxy (the Agent) and leaving the microcontroller to do only serialization, we get the best of both worlds: the full modularity and tooling of ROS2, combined with the low-cost, real-time control of microcontrollers.

If you're building a robot with an ESP32 and want to keep it in the ROS2 ecosystem, setting up a micro-ROS UDP/Serial agent is the way to go.

