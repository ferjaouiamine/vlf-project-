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
import { getRoleFromToken, saveCurrentUser } from 'src/services/user/current-user';
import * as eventsService from 'src/infrastructure/sub-pub-events/eventsSystem';
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes';
import Translation from '../../../Translation';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    login({ userName, password })
      .then((data) => {
        setLoggedIn(true);
        saveCurrentUser(data.data);
        let role = getRoleFromToken(data.data.token);
        eventsService.publish(NOTIFICATION_TOAST_EVENT, {
          toastMessage: <Translation message={data.message} />,
          variant: data.status,
        });
        // role === 'admin' ? navigate('/dashboard/app', { replace: true }) : navigate('/dashboard/livraisons', { replace: true });
        navigate('/dashboard/app', { replace: true });
      })
      .catch((err) => {
        setLoggedIn(false);
        eventsService.publish(NOTIFICATION_TOAST_EVENT, {
          toastMessage: <Translation message={err.message} />,
          variant: err.status,
        });
      });
    // setLoggedIn(true);
    // navigate('/dashboard/app', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="username"
          fullWidth
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '5%' }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '5%' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover" href="/resetPassword">
          Forgot password ?
        </Link>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover" onClick={(e) => navigate('/register')}>
          Register ?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onSubmit}>
        Login
      </LoadingButton>
    </>
  );
}
