/* eslint-disable */
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { login, register } from 'src/services/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { URL_WS } from 'src/constants';
import Input from 'src/theme/overrides/Input';
import { setLoggedIn } from 'src/contexts/AuthContext';
import { getRoleFromToken, saveCurrentUser } from 'src/services/user/current-user';
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes';
import Translation from 'src/Translation';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    userName: Yup.string().required('user name required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userName: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${URL_WS}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg);
      }
      const responseData = await response.json();
      navigate('/login', { replace: true });

      // Handle successful registration (e.g. redirect user to dashboard)
      let userName = responseData.data.user.firstName;
      let password = data.password;
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
      setLoggedIn(true);
      navigate('/dashboard/app', { replace: true });
    } catch (error) {
      // Handle registration error (e.g. display error message to user)
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
          <RHFTextField name="userName" label="User Name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
