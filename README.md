# Webdue — Meet someone new. Instantly.

Webdue is a lightweight HTML/CSS/vanilla-JavaScript prototype for a random video and text chat experience. It is designed to be easy to host as a static site and friendly to low-spec devices.

## Files included

- `index.html` — landing page
- `chat.html` — local camera preview and text-chat demo
- `about.html`, `privacy.html`, `community.html` — information and safety pages
- `css/style.css`, `css/chat.css` — responsive dark UI styles
- `js/app.js` — landing-page interactions
- `js/chat.js` — local chat demo and media controls
- `js/webrtc.js` — WebRTC/media helper functions
- `js/signaling.js` — signaling integration placeholder
- `js/matchmaking.js` — matchmaking safety/status placeholder
- `js/safety.js` — safe text handling and local-only report note
- `config.example.js` — example Firebase web configuration shape
- `database.rules.json` — locked-down starter database rules

## Run locally

Camera and microphone access generally requires HTTPS or `localhost`; do not open the HTML file directly as `file://`.

With Python installed, run this in the project folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. On Windows, `py -m http.server 8000` also works.

## Current status — important

This repository is a **frontend prototype, not a working random stranger matching service**.

- The camera preview is local to your browser.
- Text messages are local to the current page and are not sent to another person.
- Next does not find another user.
- The Report button stores a note only in the current browser session; it does not contact moderators.
- The Firebase example and signaling/matchmaking files are starter scaffolding and are not wired into a complete production matching flow.

## What real matching still needs

To connect two different users, implement and test a trusted signaling/matchmaking service, authenticated room membership, atomic queue pairing, expiring stale records, secure database rules, and cleanup when a user leaves. WebRTC needs ICE configuration; STUN alone will not connect every network, so a reliable TURN service may be needed. Never expose Firebase Admin credentials or service-account keys in browser code. Do not make database rules public just to make matching work.

Before public launch, add a real moderation/report-delivery process, rate limiting, abuse prevention, appropriate age safeguards, privacy/retention disclosures, and tests for disconnects and unauthorized access. Never promise that conversations cannot be recorded by another participant.

## Deploy

The static pages can be deployed on GitHub Pages or Vercel. Enable HTTPS for deployed camera access. Static hosting by itself does not provide live matchmaking or relay media.

## Project structure

```text
webdue/
├── index.html
├── chat.html
├── about.html
├── privacy.html
├── community.html
├── config.example.js
├── database.rules.json
├── css/
│   ├── style.css
│   └── chat.css
└── js/
    ├── app.js
    ├── chat.js
    ├── matchmaking.js
    ├── safety.js
    ├── signaling.js
    └── webrtc.js
```
