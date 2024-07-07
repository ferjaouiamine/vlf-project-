/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import CardMedia from '@mui/material/CardMedia';

import { Card, Grid, Typography, CardContent } from '@mui/material';
import { URL_WS } from 'src/constants';
import './consultantsStyle.scss';

export default function ConsultantCardComponent({ consultant, consultantsList }) {
  const navigate = useNavigate();

  const cardStyles = {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    aspectRatio: '1 / 1',
    borderRadius: '20px',
    margin: 'auto',
    cursor: 'pointer',
  };
  const imageStyles = {
    height: '100%',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.512676) 40.63%, rgba(0, 0, 0, 0.8) 100%)',
    objectFit: 'cover',
  };
  const textContainerStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '8px',
    width: '100%',
  };
  const professionStyle = {
    color: 'white',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '130.02%',
  };
  const consultantNameStyle = {
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: '27px',
    lineHeight: '130.02%',
    color: 'white',
  };
  let allData = [consultantsList, consultant];

  return (
    <>
      <Grid item xs={11} sm={6} md={3} sx={{ height: 'auto;' }}>
        <Card
          sx={cardStyles}
          onClick={() => {
            navigate('/dashboard/consultantDetails', {
              replace: true,
              state: { allData: allData },
            });
          }}
        >
          <CardMedia
            component="img"
            image={`${URL_WS}/uploads/${consultant.photo}/${consultant.photo}`}
            alt="Your Image"
            sx={imageStyles}
          />
          <div style={textContainerStyles}>
            <CardContent>
              <Typography variant="body1" style={consultantNameStyle}>
                {consultant.firstName}
              </Typography>
              <Typography variant="body1" style={professionStyle}>
                {consultant.profession}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Grid>
    </>
  );
}
