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
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import './style.css';
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
  fontWeight: 'bold',
});
export default function RadioQuestion(props) {
  const { radioQuestion, onChangeRadio, resetValues, correction } = props;

  const [radioValue, setRadioValue] = React.useState(correction ? radioQuestion.response.value : '');
  const [reset, setReset] = React.useState(resetValues);

  useLayoutEffect(() => {
    setReset(true);
  }, [props.resetValues]);

  const changeRadio = (e, id) => {
    if (!correction) {
      setRadioValue(e.target.value);
      onChangeRadio(e, radioQuestion._id);
    }
  };

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  return (
    <>
      <div style={{ marginTop: '0%', marginLeft: '1%', width: '288px' }}>
        <div className="w-50">
          <TitleStyle to="#" color="inherit" variant="subtitle2" underline="none">
            {radioQuestion.statement.statement}
            {/* {log('+++qqq', radioQuestion.statement.statement)} */}
          </TitleStyle>
        </div>
        <RadioGroup value={correction ? radioQuestion.response.value : radioValue} row>
          {radioQuestion.statement.choices.map((c) => (
            <FormControlLabel
              value={c}
              control={<Radio />}
              label={c}
              sx={{ width: '139px' }}
              onChange={(e) => changeRadio(e, radioQuestion._id)}
            />
          ))}
        </RadioGroup>
      </div>
    </>
  );
}
RadioQuestion.propTypes = {
  // rateQuestion: PropTypes.object.isRequired,
};
