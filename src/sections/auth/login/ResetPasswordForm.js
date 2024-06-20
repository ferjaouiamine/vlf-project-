/* eslint-disable */
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { login } from 'src/services/auth';
import { setLoggedIn } from 'src/contexts/AuthContext';
import { saveCurrentUser } from 'src/services/user/current-user';
import * as eventsService from 'src/infrastructure/sub-pub-events/eventsSystem';
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes';
import  Translation from '../../../Translation';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    const url = `${URL_WS}/user/forgotPasswd`
    jsonWebService
      .post(url, {
        Email: `${email}`,
      })
    .then((data) => {
      eventsService.publish(NOTIFICATION_TOAST_EVENT, { toastMessage: <Translation message= {data.message} /> , variant: data.status }); } )
    .catch(err => {
      eventsService.publish(NOTIFICATION_TOAST_EVENT, { toastMessage: <Translation message= {err.error} /> , variant: err.status });
    })
    
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
        name="email"
        label="Email"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover" href='/login'>
          Login ?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onSubmit} >
        Reset Password
      </LoadingButton>
      </>
  );
}
