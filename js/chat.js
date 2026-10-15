/* Webdue peer-to-peer room mode. Uses PeerJS hosted signaling; no self-hosted server. */
(() => {
const $ = id => document.getElementById(id);
const status = $('status'), chatStatus = $('chat-status'), remoteVideo = $('remote-video'), localVideo = $('local-video');
let peer = null, localStream = null, remoteCall = null, dataConn = null, hostId = null, isHost = false, micOn = true, cameraOn = true;
const params = new URLSearchParams(location.search);
const requestedHost = params.get('join');
function say(message) { status.textContent = message; }
function chatSay(message) { chatStatus.textContent = message; }
function addMessage(message, mine=false) { const node=document.createElement('div');node.className='message'+(mine?' mine':'');node.textContent=String(message).slice(0,500);$('messages').append(node);$('messages').scrollTop=$('messages').scrollHeight; }
function requirePeer() { if (!window.Peer) { say('PeerJS could not load. Check your internet connection and refresh.'); return false; } return true; }
function setConnected(connected) { $('message-input').disabled=!connected; $('message-form').querySelector('button').disabled=!connected; }
setConnected(false);
function setupPeer(onReady) {
 if (!requirePeer()) return;
 if (peer && !peer.destroyed) { onReady?.(); return; }
 peer = new Peer();
 peer.on('open', id => { say(isHost ? 'Room created. Share the invite link.' : 'Ready to connect to room.'); onReady?.(id); });
 peer.on('error', err => { say('Connection service: '+(err.type||err.message||'error')+'. Try creating a new room.'); });
 peer.on('call', call => { remoteCall=call; if (localStream) answerCall(call); else say('Someone is calling. Press Start video & mic to accept.'); });
 peer.on('connection', conn => { dataConn=conn; wireData(conn); });
 peer.on('disconnected', () => say('Signaling disconnected. Check your internet connection.'));
}
function wireData(conn) {
 conn.on('open', () => { chatSay('Text chat connected.'); setConnected(true); });
 conn.on('data', data => { if (data && data.type==='message') addMessage('Them: '+String(data.text||'').slice(0,500)); });
 conn.on('close', () => { chatSay('Text chat disconnected.'); setConnected(false); });
 conn.on('error', () => chatSay('Text chat connection error.'));
}
function answerCall(call) {
 if (!localStream) { say('Press Start video & mic to accept the call.'); return; }
 call.answer(localStream);
 call.on('stream', stream => showRemote(stream));
 call.on('close', () => { remoteVideo.srcObject=null; $('remote-placeholder').hidden=false; say('The other person ended the call.'); });
 call.on('error', () => say('Video connection failed. Try reconnecting; some networks need TURN.'));
}
function showRemote(stream) { remoteVideo.srcObject=stream; $('remote-placeholder').hidden=true; remoteVideo.play().catch(()=>{}); say('Video connected.'); }
function connectData(id) {
 try { dataConn=peer.connect(id,{reliable:true}); wireData(dataConn); } catch(e) { chatSay('Could not start text chat: '+e.message); }
}
function setLocal(stream) { localVideo.srcObject=stream; $('local-placeholder').hidden=true; localVideo.play().catch(()=>{}); $('mute').disabled=false; $('camera').disabled=false; }
$('create-room').addEventListener('click', () => {
 isHost=true; hostId=null;
 setupPeer(id => {
  if (!id) return;
  const url=new URL(location.href);url.searchParams.set('join',id);
  $('share-link').value=url.href;$('share-box').hidden=false;
  say('Room ready. Share the invite link with one person.');
 });
});
$('join-room').addEventListener('click', () => {
 const id=$('room-code').value.trim()||requestedHost;
 if (!id) { say('Paste a room code or open an invite link.'); return; }
 if (peer) { say('A room is already open. End it before joining another.'); return; }
 hostId=id;isHost=false;
 setupPeer(() => {
  if (!localStream) { say('Room found. Now press Start video & mic to connect.'); return; }
  startOutgoing();
 });
});
function startOutgoing() {
 if (!peer || !hostId || !localStream) return;
 try {
  remoteCall=peer.call(hostId,localStream);
  remoteCall.on('stream',showRemote);
  remoteCall.on('close',()=>{remoteVideo.srcObject=null;$('remote-placeholder').hidden=false;say('Call ended.');});
  remoteCall.on('error',()=>say('Video connection failed. Check the room code and network.'));
  connectData(hostId);
  say('Calling the room host…');
 } catch(e) { say('Could not call: '+e.message); }
}
$('start-media').addEventListener('click', async () => {
 try {
  if (!navigator.mediaDevices?.getUserMedia) throw new Error('Camera requires HTTPS or localhost.');
  localStream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});setLocal(localStream);
  $('start-media').disabled=true;
  if (!peer) {
   if (requestedHost) { hostId=requestedHost;isHost=false;setupPeer(()=>startOutgoing()); }
   else say('Camera ready. Create a room or join using a room code.');
  } else if (remoteCall && isHost) answerCall(remoteCall);
  else if (hostId) startOutgoing();
  else say('Camera ready. Share your room link, or join another room.');
 } catch(e) { say('Could not start camera/mic: '+e.message+' Check browser permissions and use HTTPS.'); }
});
$('mute').addEventListener('click',()=>{if(!localStream)return;micOn=!micOn;localStream.getAudioTracks().forEach(t=>t.enabled=micOn);$('mute').textContent=micOn?'Mute mic':'Unmute mic';});
$('camera').addEventListener('click',()=>{if(!localStream)return;cameraOn=!cameraOn;localStream.getVideoTracks().forEach(t=>t.enabled=cameraOn);$('camera').textContent=cameraOn?'Turn camera off':'Turn camera on';});
$('copy-link').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('share-link').value);say('Invite link copied.');}catch{ $('share-link').select();say('Select and copy the invite link.');}});
$('message-form').addEventListener('submit',e=>{e.preventDefault();const input=$('message-input'),value=input.value.trim().slice(0,500);if(!value)return;if(!dataConn||!dataConn.open){chatSay('Join a room and wait for the text connection first.');return;}dataConn.send({type:'message',text:value});addMessage('You: '+value,true);input.value='';});
function cleanup() { if (remoteCall) { try{remoteCall.close();}catch{} remoteCall=null; } if(dataConn){try{dataConn.close();}catch{}dataConn=null;} if(localStream){localStream.getTracks().forEach(t=>t.stop());localStream=null;} if(peer){try{peer.destroy();}catch{}peer=null;} remoteVideo.srcObject=null;localVideo.srcObject=null;$('remote-placeholder').hidden=false;$('local-placeholder').hidden=false;$('start-media').disabled=false;$('mute').disabled=true;$('camera').disabled=true;$('share-box').hidden=true;$('messages').replaceChildren();addMessage('Room ended. Create or join another room.');setConnected(false);chatSay('Disconnected.');say('Room ended.'); }
$('end').addEventListener('click',cleanup);
$('report').addEventListener('click',()=>{cleanup();say('Disconnected for safety. No report is sent to a moderation team in this prototype.');});
window.addEventListener('pagehide',()=>{if(localStream)localStream.getTracks().forEach(t=>t.stop());if(peer)peer.destroy();});
if (requestedHost) { $('room-code').value=requestedHost; say('Invite link detected. Press Start video & mic to join the room.'); }
})();