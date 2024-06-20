/* eslint-disable */
const webSocket = new WebSocket("ws://localhost:3000/");

let connectionData = {
    pcConnection: new RTCPeerConnection(null),
    remoteStream: null,
    localStream: null,
    connectionCount: 0,
}

let candidateManager ={
    sendet:false,
    candidateAdded:false
};

let candidateSendet = false;
//für später
let connectionDataList = [];


//web Socket funktionen
webSocket.onopen = function (e) {

    createOffer();

}

webSocket.onmessage = function (e) {

    let sdpObject = JSON.parse(e.data);
    if (sdpObject.type == "offer") {
        console.log("offer");
        setRemoteDescriptionFromOffer(sdpObject);
        createAnswer();
    }
    if (sdpObject.type == "answer") {
        console.log("answer");
        setRemoteDescriptionFromAnswer(sdpObject);
    }

    if (sdpObject.type == "candidate") {
        console.log("candidate");
        console.log(e);
        //console.log("streams: ", connectionData.remoteStream.srcObject);
        setCandidate(sdpObject.candidate);

    }

}

//stream functions
async function getMedia() {
    const constraints = {
        audio: false,
        video: true,
    }

    await navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            connectionData.localStream.srcObject = stream;
            stream.getTracks().forEach(track => {
                //console.log("user Media", stream);
                connectionData.pcConnection.addTrack(track, stream);
            })
        })

}

function createOffer() {

    connectionData.pcConnection.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
    }).then(async sdp => {

        webSocket.send(JSON.stringify(sdp));
        await connectionData.pcConnection.setLocalDescription(sdp);

        candidateManager.sendet=false;
    });

}


function createAnswer() {

    connectionData.pcConnection.createAnswer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
    }).then(async sdp => {

        webSocket.send(JSON.stringify(sdp));
        await connectionData.pcConnection.setLocalDescription(sdp);
    });

}
async function setRemoteDescription(sdp) {
    await connectionData.pcConnection.setRemoteDescription(new RTCSessionDescription(sdp))
}

async function setRemoteDescriptionFromOffer(sdp) {
    await connectionData.pcConnection.setRemoteDescription(new RTCSessionDescription(sdp)).then((e)=>{
        createAnswer();
    }).catch((e)=>{
        console.log(`failure MESSAGE:${e.name}`)

    })
}

async function setRemoteDescriptionFromAnswer(sdp){
    await connectionData.pcConnection.setRemoteDescription(new RTCSessionDescription(sdp)).catch((e)=>{
        console.log(`failure MESSAGE:${e.name}`)
    })
}

function setCandidate(candidate) {

    if (connectionData.pcConnection.remoteDescription != null) {
        connectionData.pcConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch((e)=>{
            console.log(`failure MESSAGE:${e.name}`)
          });;
          console.log(connectionData.remoteStream.srcObject);
    }
}

connectionData.pcConnection.onicecandidate = function (e) {

    if (e.candidate != null) {
        const candidate = {
            type: "candidate",
            candidate: e.candidate
        }
        if (candidate.candidate.protocol == "udp" && candidateManager.sendet==false) {
            webSocket.send(JSON.stringify(candidate));
            console.log("sendet Candidate",candidate);
            candidateManager.sendet = true;
        }
    }

}

connectionData.pcConnection.ontrack = (e) => {
    console.log("onTrack", e.streams[0]);
    connectionData.remoteStream.srcObject = e.streams[0];
    //console.log("remoteStream: ", e.streams);
}




export {
    webSocket,
    connectionData,
    getMedia,
    connectionDataList,
    candidateSendet
}