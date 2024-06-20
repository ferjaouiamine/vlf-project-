import React from 'react';
import Avatar from '@mui/material/Avatar';

const colors = ['#AA3311', '#AA9900', '#AAAD00', '#116633', '#113355', '#AA11AA'];

const getColor = (letter) => {
  const index = letter.charCodeAt(0) % colors.length;
  return colors[index];
};

const ColoredAvatar = ({ letter }) => {
  const color = getColor(letter);

  const avatarStyle = {
    marginRight: '1rem',
    backgroundColor: color,
  };

  return <Avatar sx={avatarStyle}>{letter && letter.charAt(0).toUpperCase()}</Avatar>;
};

export default ColoredAvatar;
