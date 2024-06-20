/* eslint-disable */
import { useEffect, } from 'react'
import { getMedia, connectionData} from './Connection'
// import './App.css'

export default function Meeting() {


  useEffect(() => {

    connectionData.localStream = document.getElementById("localVideoStream");
    connectionData.remoteStream = document.getElementById("remoteStream");
    getMedia();


  }, [])

  return (
    <div>
      <video id ="localVideoStream" autoPlay></video>
      <video  id = "remoteStream" autoPlay style={{
        height: `${250}px`,
        width: `${250}px`,
        border: `solid ${1}px black`
      }}></video>
    </div>
  )
}
