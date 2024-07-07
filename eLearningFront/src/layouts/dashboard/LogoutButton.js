import { useRef, useState } from 'react';
// @mui
import {  IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function LogoutButton() {
  const anchorRef = useRef(null);

  const [ setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        // onClick={handleOpen}
       
      >
        <Iconify icon="clarity:logout-solid" style={{color:'#000', fontSize:'xxx-large'}} />
      </IconButton>

      
    </>
  );
}
