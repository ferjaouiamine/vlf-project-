/* eslint-disable */
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { URL_IMG } from 'src/constants';

const AddUserFormImage = () => {
  return (
    <div>
      <Player
        src= {`${URL_IMG}/lottieFiles/add_user.json`}
        style={{width:'30%', marginBottom:'10%'}}
        className="player"
        loop
        autoplay
      />
    </div>
  );
};

export default AddUserFormImage;
