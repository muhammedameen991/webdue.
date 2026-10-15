# Webdue

Webdue is a lightweight static website prototype for invite-link video, audio and text conversations. It uses HTML, CSS, vanilla JavaScript, WebRTC via PeerJS, and PeerJS's hosted signaling service. You do not need to run or maintain your own backend server for the basic invite-room flow.

## Included

- Responsive landing page
- Create a private room and copy an invite link
- Join a room using the host's room ID or invite link
- Browser camera/microphone preview and mute/camera controls
- Peer-to-peer video/audio call and text messages when the browsers connect
- End/disconnect controls and basic safety notice
- About, privacy and community-guideline pages

## Run locally

Camera/microphone access requires HTTPS or localhost. In the project folder, run:

```bash
py -m http.server 8000
```

Then open http://localhost:8000. Deploy the static files to GitHub Pages or another HTTPS static host for remote testing.

## How connection works

1. The host selects **Create room**. PeerJS obtains a peer ID from its hosted signaling service.
2. The host shares the generated invite link privately.
3. The guest opens the link, grants media permission, and calls the host.
4. WebRTC carries media and chat directly between the two browsers where network conditions allow.

## Limitations — read before sharing publicly

- This is **invite-link peer-to-peer calling, not random stranger matchmaking**. There is no shared queue to pair arbitrary visitors.
- There is no self-hosted backend, but the project depends on the third-party PeerJS hosted signaling service and CDN. Service availability, rate limits and policies are outside this repository's control.
- STUN-only paths may fail on some networks. Reliable connectivity may require a TURN relay, which is an external service and may cost money.
- A report button disconnects the call; it does not send a report to a moderation team.
- Do not share room links publicly; anyone with a link may attempt to join. Do not share personal information.
- Before a public service, implement abuse reporting/moderation, rate limiting, privacy disclosures, age-appropriate safeguards and test security on multiple networks/devices.

## Deployment

Publish the repository's static files on GitHub Pages and enable HTTPS. Open `chat.html` from the deployed site; camera permission will not work on an ordinary insecure HTTP origin except localhost.

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
