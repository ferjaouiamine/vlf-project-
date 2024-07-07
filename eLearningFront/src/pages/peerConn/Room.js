/* eslint-disable */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createChannel, createClient, RtmMessage } from 'agora-rtm-react';
import { useNavigate } from 'react-router-dom';
import './room.css';

let APP_ID = '7fcbe81073394cb5bc52993fb4416163';

let token = null;
let uid = String(Math.floor(Math.random() * 10000));

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

let constraints = {
  video: {
    width: { min: 640, ideal: 1920, max: 1920 },
    height: { min: 480, ideal: 1080, max: 1080 },
  },
  audio: true,
};

const useClient = createClient('7fcbe81073394cb5bc52993fb4416163');

let peerConn;
let localStream;
let remoteStream;
export default function Room() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const useChannel = createChannel(state);

  const [client, setClient] = useState(useClient());
  const [channel, setChannel] = useState(useChannel(client));
  const [roomId, setRoomId] = useState(state);

  let init = async () => {
    let clientt;
    let channell;

    clientt = useClient();
    setClient(clientt);
    await clientt.login({ uid, token });

    channell = useChannel(clientt);

    setChannel(channell);
    await channell.join();

    channell.on('MemberJoined', handleUserJoined);
    channell.on('MemberLeft', handleUserLeft);

    clientt.on('MessageFromPeer', handleMessageFromPeer);

    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    var video = document.getElementById('user-1');
    video.srcObject = localStream;
    video.onloadedmetadata = function (e) {
      video.play();
    };
  };

  let handleUserLeft = (MemberId) => {
    document.getElementById('user-2').style.display = 'none';
    document.getElementById('user-1').classList.remove('smallFrame');
  };

  let handleMessageFromPeer = async (message, MemberId) => {
    message = JSON.parse(message.text);

    if (message.type === 'offer') {
      createAnswer(MemberId, message.offer);
    }

    if (message.type === 'answer') {
      addAnswer(message.answer);
    }

    if (message.type === 'candidate') {
      if (peerConn) {
        peerConn.addIceCandidate(message.candidate);
      }
    }
  };

  let handleUserJoined = async (MemberId) => {
    console.log('A new user joined the channel:', MemberId);
    createOffer(MemberId);
  };

  let createPeerConnection = async (MemberId) => {
    peerConn = new RTCPeerConnection(servers);
    remoteStream = new MediaStream();
    var video = document.getElementById('user-2');
    video.srcObject = remoteStream;
    video.onloadedmetadata = function (e) {
      video.play();
    };
    document.getElementById('user-2').style.display = 'block';

    document.getElementById('user-1').classList.add('smallFrame');

    if (!localStream) {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      var video1 = document.getElementById('user-1');
      video1.srcObject = localStream;
      video1.onloadedmetadata = function (e) {
        video1.play();
      };
    }

    localStream.getTracks().forEach((track) => {
      peerConn.addTrack(track, localStream);
    });

    peerConn.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    peerConn.onicecandidate = async (event) => {
      if (event.candidate) {
        client.sendMessageToPeer({ text: JSON.stringify({ type: 'candidate', candidate: event.candidate }) }, MemberId);
      }
    };
  };

  let createOffer = async (MemberId) => {
    await createPeerConnection(MemberId);

    let offer = await peerConn.createOffer();
    await peerConn.setLocalDescription(offer);

    client.sendMessageToPeer({ text: JSON.stringify({ type: 'offer', offer: offer }) }, MemberId);
  };

  let createAnswer = async (MemberId, offer) => {
    await createPeerConnection(MemberId);

    await peerConn.setRemoteDescription(offer);

    let answer = await peerConn.createAnswer();
    await peerConn.setLocalDescription(answer);

    client.sendMessageToPeer({ text: JSON.stringify({ type: 'answer', answer: answer }) }, MemberId);
  };

  let addAnswer = async (answer) => {
    if (!peerConn.currentRemoteDescription) {
      peerConn.setRemoteDescription(answer);
    }
  };

  let leaveChannel = async () => {
    localStream.getVideoTracks()[0].stop();
    await channel.leave();
    await client.logout();
  };

  let leaveThisChannel = async (e) => {
    localStream.getVideoTracks()[0].stop();
    localStream.getAudioTracks()[0].stop();
    let audioTrack = localStream.getTracks().find((track) => track.kind === 'audio');
    audioTrack.enabled = false;
    await channel.leave();
    await client.logout();
    navigate('/dashboard/app', { replace: true });
  };

  let toggleCamera = async () => {
    let videoTrack = localStream.getTracks().find((track) => track.kind === 'video');

    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      // document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)'
      document.getElementById('camera-btn').style.backgroundColor = '#86b4ff';
    } else {
      videoTrack.enabled = true;
      document.getElementById('camera-btn').style.backgroundColor = '#2F95CA';
    }
  };

  let toggleMic = async () => {
    let audioTrack = localStream.getTracks().find((track) => track.kind === 'audio');

    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      document.getElementById('mic-btn').style.backgroundColor = '#86b4ff';
    } else {
      audioTrack.enabled = true;
      document.getElementById('mic-btn').style.backgroundColor = '#2F95CA';
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', leaveChannel);

    document.getElementById('camera-btn').addEventListener('click', toggleCamera);
    document.getElementById('mic-btn').addEventListener('click', toggleMic);

    init();
  }, []);

  return (
    <>
      <div>
        <div id="videos">
          <video class="video-player" id="user-1" autoplay playsinline></video>
          <video class="video-player" id="user-2" autoplay playsinline></video>
        </div>

        <div id="controls">
          <div class="control-container" id="camera-btn">
            <img src="icons/camera.png" width={50} />
          </div>

          <div class="control-container" id="mic-btn">
            <img src="icons/mic.png" width={50} />
          </div>
          <div class="control-container" onClick={(e) => leaveThisChannel(e)} id="leave-btn">
            <img src="icons/phone.png" width={50} />
          </div>
        </div>
      </div>
    </>
  );
}
