/* eslint-disable */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './lobby.css';



export default function Lobby() {
    const navigate = useNavigate();
    const joinRoom = (e) => {
        e.preventDefault()
        let roomId = document.getElementById('roomId')
        // let inviteCode = e.target.invite_link.value
        navigate('/dashboard/room', { replace: true, state: roomId.value })
        // window.location = `index.html?room=${inviteCode}` 
    }

    return (
        <>
        <div>
        <main id="lobby-container">
        <div id="form-container">
            <div id="form__container__header">
                <p>👋 Join a Room</p>
            </div>

            <div id="form__content__wrapper">
                <form id="join-form">
                    <input type="text" id="roomId" name="invite_link" required/>
                    <input type="submit" value="Join Room" onClick={e => joinRoom(e)} />
                </form>
            </div>
        </div>
    </main>
        </div>
        </>
    )
}