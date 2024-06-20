/* eslint-disable */
import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider, Link, styled, Button, Typography, Rating } from '@mui/material';
import './style.css';
import { useLayoutEffect } from 'react';
import { getCurrentUser } from 'src/services/user/current-user';

// import Slide from '@mui/material/Slide';

const theme = createTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.2)',
      },
    },
  },
});

const TitleStyle = styled(Link)({
  // height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontWeight: '600',
});
export default function RatingQuestion(props) {
  const { rateQuestion, onChangeRating, resetValues, correction } = props;
  const [rateValues, setRateValues] = React.useState(rateQuestion.response.value);
  const [reset, setReset] = React.useState(resetValues);

  useLayoutEffect(() => {
    setReset(true);
  }, [props.resetValues]);

  const changeRate = (e) => {
    if (!correction) {
      setRateValues(e.target.value);
      onChangeRating(e, rateQuestion._id, e.target.value);
    }
  };
  // const ConsoleLog = ({ children }) => {
  //   console.log('childrenn',children);
  //   return false;
  // };

  return (
    <>
      <div>
        {/* <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
          {rateQuestion.statement.value}
        </TitleStyle> */}
        {
          <div className="flex" style={{ marginBottom: '1%', marginTop: '1%' }}>
            <div className="w-50">
              <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
                {rateQuestion.statement.statement}
              </TitleStyle>
            </div>
            <Rating
              name="read-only"
              value={correction ? rateQuestion.response?.value : rateValues}
              max={5}
              onChange={(e) => changeRate(e)}
            />
          </div>
        }
      </div>
    </>
  );
}
RatingQuestion.propTypes = {
  rateQuestion: PropTypes.object.isRequired,
};
