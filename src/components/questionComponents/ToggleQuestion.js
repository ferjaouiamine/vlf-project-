/* eslint-disable */
import * as React from 'react';
import { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  createTheme,
  ThemeProvider,
  Link,
  styled,
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import './style.css';
import { userServices } from 'src/services/user';
import { getCurrentUser } from 'src/services/user/current-user';
import { useEffect } from 'react';

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
  // display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  fontWeight: '600',
  marginTop: '5%',
  // width:'150px'
});
export default function ToggleQuestion(props) {
  const { toggleQuestion, onChangeToggle, resetValues, correction } = props;

  const [toggleValue, setToggleValue] = React.useState(correction ? toggleQuestion.response.value : '');

  const [reset, setReset] = React.useState(resetValues);
  const [error, setError] = React.useState(false);

  useLayoutEffect(() => {
    setReset(true);
  }, [props.resetValues]);
  useEffect(() => {
    if (!correction && !toggleValue) {
      setError(true);
    } else {
      setError(false);
    }
  }, [correction, toggleValue]);
  const changeToggle = (e, id) => {
    if (!correction) {
      setToggleValue(e.target.value === 'true' ? 'true' : 'false');
      onChangeToggle(e, toggleQuestion._id);
    }
  };

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  return (
    <>
      <div className="flex" style={{ marginLeft: '1%', marginBottom: '1%', marginTop: '1%' }}>
        <div className="w-10">
          <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
            {toggleQuestion.statement.statement}
          </TitleStyle>
        </div>
        <br />
        <ToggleButtonGroup
          color="primary"
          size="small"
          exclusive
          error={error}
          sx={{ height: '25px' }}
          onChange={(e) => changeToggle(e, toggleQuestion._id)}
        >
          <ToggleButton
            value="true"
            style={
              correction
                ? toggleQuestion.response.value === 'true' || toggleQuestion.response.value === true
                  ? { outline: 'none', color: '#258053', backgroundColor: '#A5EAC9 ' }
                  : { outline: 'none', backgroundColor: '#fff', color: 'grey' }
                : toggleValue === 'true'
                ? { outline: 'none', color: '#258053', backgroundColor: '#A5EAC9 ' }
                : { outline: 'none', backgroundColor: '#fff', color: 'grey' }
            }
            selected={
              correction
                ? toggleQuestion.response.value === 'true' || toggleQuestion.response.value === true
                  ? 'true'
                  : 'false'
                : toggleValue === 'true'
                ? 'true'
                : 'false'
            }
          >
            True
          </ToggleButton>
          <ToggleButton
            value="false"
            style={
              correction
                ? toggleQuestion.response.value === 'false' || toggleQuestion.response.value === false
                  ? { outline: 'none', backgroundColor: '#F9BCBB', color: 'red' }
                  : { outline: 'none', backgroundColor: '#fff', color: 'grey' }
                : toggleValue === 'false'
                ? { outline: 'none', backgroundColor: '#F9BCBB', color: 'red' }
                : { outline: 'none', backgroundColor: '#fff', color: 'grey' }
            }
            selected={
              correction
                ? toggleQuestion.response.value === 'false' || toggleQuestion.response.value === false
                  ? 'true'
                  : 'false'
                : toggleValue === 'false'
                ? 'true'
                : 'false'
            }
          >
            False
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </>
  );
}
ToggleQuestion.propTypes = {};
