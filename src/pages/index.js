import Head from "next/head";
import Link from "next/link";
import { profile, socialLinks, sponsor } from "../utils/data";

export default function Home() {
  const locationParts = [
    profile.location.city,
    profile.location.country,
  ].filter(Boolean);

  return (
    <>
      <Head>
        <title>{`${profile.name} · ${profile.role}`}</title>
        <meta name="description" content={profile.bio} />
        <meta
          property="og:title"
          content={`${profile.greeting} ${profile.name}`}
        />
        <meta property="og:description" content={profile.bio} />
        <meta property="og:site_name" content={profile.name} />
      </Head>
      <div className="landing">
        <div className="sphere" aria-hidden="true" />

        <Link href="/" className="logo" aria-label={`${profile.name} home`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
            role="img"
          >
            <title>{`${profile.name} logo`}</title>
            <path
              d="M300,250a50,50,0,0,1-100,.78H150a100,100,0,0,0,200,0h0V76.85a198.63,198.63,0,0,0-50-20.52Z"
              transform="translate(-50 -50)"
            />
            <path
              d="M400,382.13a199.13,199.13,0,0,0,50-131.35h0c0-.26,0-.52,0-.78a199.11,199.11,0,0,0-50-132.11V250c0,82.71-67.29,150-150,150S100,332.71,100,250s67.29-150,150-150V50C139.72,50,50,139.72,50,250s89.72,200,200,200a199.56,199.56,0,0,0,150-67.87Z"
              transform="translate(-50 -50)"
            />
            <path
              d="M100,249.22h0V250C100,249.74,100,249.48,100,249.22Z"
              transform="translate(-50 -50)"
            />
          </svg>
        </Link>

        <button
          className="theme-toggle"
          type="button"
          aria-label="Toggle theme"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
          </svg>
        </button>

        <main className="hero">
          <p className="eyebrow">{profile.greeting}</p>
          <h1>{profile.name}</h1>
          <p className="tagline">{profile.role}</p>
          <p className="bio">{profile.bio}</p>
          <div className="location">
            <span className="location-dot" aria-hidden="true" />
            <span>{locationParts.join(", ")}</span>
          </div>
          <nav aria-label="Social links" className="social">
            <ul>
              {socialLinks.map((link) => (
                <li key={link.network}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    title={link.label}
                  >
                    <span aria-hidden="true">{link.short}</span>
                    <span className="sr-only">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </main>

        <a
          className="sponsor"
          href={sponsor.url}
          target="_blank"
          rel="noreferrer"
        >
          <span>{sponsor.label}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z" />
          </svg>
        </a>
      </div>
    </>
  );
}
