/* eslint-disable */
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useNavigate } from 'react-router-dom';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import { getCurrentUser } from 'src/services/user/current-user';

const SocketContext = createContext();
// const socket = io('http://102.110.0.33:8089/undp');

const socket = io('localhost:5000');
// const socket = io('https://warm-wildwood-81069.herokuapp.com');
// const socket = io('https://fodhasu.cluster030.hosting.ovh.net/elearningback/');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const navigate = useNavigate();

  const saveMeetId = (id) => {
    if(getCurrentUser().role === 'consultant'){
      let meetId = sessionStorage.getItem('meetingId')
      const url = `${URL_WS}/meeting/update/${meetId}`;
      jsonWebService
        .post(url, {
          roomId: id
        })
        .then((response) => {
          console.log('responnnse',response)
        })
        .catch((err) => {
          console.log('errrrrrrrrrrrrrrrr updating', err)
        });
    }
  }

  useEffect(() => {
    let verifyId;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      myVideo.current.srcObject = currentStream;
    });

    socket.on('me', (id) => {
      verifyId = id;
      saveMeetId(id)
      setMe(id);
    });

    // if(verifyId === undefined){
    //   setTimeout(() => window.location.reload(), 5000);

    // }

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();
    navigate('/dashboard/app', { replace: true });
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
