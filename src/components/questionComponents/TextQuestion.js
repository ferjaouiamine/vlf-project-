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
  TextField,
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
  marginTop:'5%'
});
export default function TextQuestion(props) {
  const { textQuestion, onChangeText, resetValues, correction } = props;
  
  const [ textValue, setTextValue] = React.useState(textQuestion.response.length > 0 ? textQuestion.response[0].value : '')
  const [reset, setReset] = React.useState(resetValues)

  useLayoutEffect(() => {
    setReset(true)
  }, [props.resetValues]);
  
  const changeText = (e, id) => {
    if(correction){
    setTextValue(e.target.value)
    onChangeText(e, textQuestion._id)
    }
  }

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });


  return (
    <>
      <div className="flex" style={{ marginLeft: '2%', marginTop:'1%', marginBottom:'1%' }}>
        
        <TextField
          id="outlined-multiline-flexible"
          label={textQuestion.statement.statement}
          multiline
          rows= {4}
          value={correction ? textQuestion.response.length > 0 ? textQuestion.response[0].value : '' : textValue}
          style={{width: '325px'}}
          fullWidth
          onChange={e => changeText(e, textQuestion._id)}
        />
      </div>
    </>
  );
}
TextQuestion.propTypes = {
  rateQuestion: PropTypes.object.isRequired,
};


