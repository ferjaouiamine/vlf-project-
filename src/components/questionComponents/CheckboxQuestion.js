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
  FormGroup,
  Checkbox,
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
export default function CheckboxQuestion(props) {
  const { checkboxQuestion, onChangeCheckbox, resetValues, correction } = props;

  const [checkboxValue, setCheckboxValue] = React.useState(correction ? checkboxQuestion.response.value : ['']);
  const [reset, setReset] = React.useState(resetValues);
  useLayoutEffect(() => {
    setReset(true);
  }, [props.resetValues]);

  const changeCheckbox = (e, id) => {
    if (!correction) {
      setCheckboxValue(e.target.value);
      onChangeCheckbox(e, checkboxQuestion._id);
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
            {checkboxQuestion.statement.statement}
          </TitleStyle>
        </div>
        {!correction && (
          <FormGroup value={checkboxValue} row>
            {checkboxQuestion.statement.choices.map((c) => (
              <FormControlLabel
                value={c}
                control={<Checkbox />}
                label={c}
                sx={{ width: '139px' }}
                onChange={(e) => changeCheckbox(e, checkboxQuestion._id)}
              />
            ))}
          </FormGroup>
        )}
        {correction && (
          <FormGroup value={checkboxQuestion.statement.answers[0]} row>
            {checkboxQuestion.statement.choices.map((c) => (
              <FormControlLabel
                key={c}
                value={c}
                control={<Checkbox />}
                label={c}
                checked={checkboxQuestion.statement.answers.includes(c)}
                sx={{ width: '139px' }}
                onChange={(e) => changeCheckbox(e, checkboxQuestion._id)}
              />
            ))}
          </FormGroup>
        )}
      </div>
    </>
  );
}
CheckboxQuestion.propTypes = {
  //   rateQuestion: PropTypes.object.isRequired,
};
