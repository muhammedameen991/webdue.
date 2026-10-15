# Webdue

**Meet someone new. Instantly.**

Webdue is a lightweight, responsive random video/text chat interface built with HTML, CSS, and vanilla JavaScript.

## Current features

- Responsive dark blue/violet landing page
- Local camera and microphone preview using `getUserMedia`
- Microphone and camera toggles
- Local text-chat interface
- Start, Next, End, and Report controls
- Basic privacy and safety messaging
- No build tools or package installation required

## Run locally

Camera access requires a secure context. Use localhost rather than opening the HTML file directly.

With Python installed:

```bash
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Important: this is a frontend starter

The current version **does not connect strangers to each other**. The chat messages are local to the current browser page, and the Report button does not send a report to moderators. The camera preview is local only.

To implement real peer-to-peer calls, add a signaling and matchmaking service (for example, Firebase Realtime Database plus carefully secured rules and trusted server-side matchmaking). WebRTC also needs ICE servers; a TURN relay is important for connectivity across restrictive networks. Never place service-account secrets in browser code.

Before public launch, implement and test:
- Server-controlled, race-safe matchmaking and room cleanup
- Authentication/abuse throttling and secure database rules
- Real report delivery, moderation workflow, and blocking
- Appropriate age safeguards and clear privacy/retention policies
- Consent-based media permissions, disconnect handling, and abuse prevention
- TURN configuration and cross-network tests

Do not advertise the starter as a working random stranger video-chat service until these components have been implemented and tested.

## Deploy

The static interface can be deployed to GitHub Pages or another static host. Camera access on deployed sites requires HTTPS. Real-time matching requires additional service configuration; static hosting alone cannot provide it.

## License

Add a license file if you want to specify reuse permissions.