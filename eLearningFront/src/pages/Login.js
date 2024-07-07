/* eslint-disable */
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { LoginForm } from '../sections/auth/login';
import AuthSocial from '../sections/auth/AuthSocial';
import LogoElearning from 'src/components/LogoElearning';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  // margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const FormLoginStyle = styled('div')(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, .9)',
  float: 'left',
  marginRight: '0%',
  width: '40%',
  paddingLeft: '5%',
  paddingRight: '5%',
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/eLearning.jpeg)`,
        backgroundSize: 'cover',
      }}
    >
      <Page title="Login">
        <FormLoginStyle>
          <ContentStyle>
            <div style={{ textAlign: 'center', marginTop: '0%', marginBottom: '0%' }}>
              <LogoElearning location="login" />
              {/* <Typography variant="h4" gutterBottom>
              LOGIN
            </Typography> */}
            </div>
            <LoginForm />
          </ContentStyle>
        </FormLoginStyle>
      </Page>
    </div>
  );
}
