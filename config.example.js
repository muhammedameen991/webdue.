// Copy this file to config.js and fill in your Firebase web app settings.
// Do not put Firebase Admin credentials or service-account keys in browser code.
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.REGION.firebasedatabase.app",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};
export const rtcConfig = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
