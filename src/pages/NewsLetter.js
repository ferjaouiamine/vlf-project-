/* eslint-disable */
// @mui
import { styled } from '@mui/material/styles';
// hooks
import './home.scss';
import { useState } from 'react';
import { jsonWebService } from 'src/infrastructure/web-service';

// ----------------------------------------------------------------------

const NewsletterForm = styled('form')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: 63,
  maxWidth: 450,
  marginTop: '10%',
  //   margin: 'auto',
});

const NewsletterInput = styled('input')(({ theme }) => ({
  flex: '1 0 0',
  padding: theme.spacing(1.5),
  //   border: `1px solid ${theme.palette.primary.main}`,
  border: `1px solid #FFDBDB`,
  //   borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,

  //   color: theme.palette.text.primary,
  height: '50px',
  marginTop: '0%',
  '&::placeholder': {
    paddingTop: '1%',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontStyle: 'normal',
    fontFamily: 'sans-serif',
    lineHeight: '2.36px',
    fontWeight: '250',
    color: '#A7A7A7',
  },
  cursor: 'text', //
}));

const NewsletterButton = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1.5),
  backgroundColor: '#FFDBDB',
  width: '130.7px',
  height: '50px',
  border: `1px solid #FFDBDB`,
  boxSizing: 'border-box',
  borderRadius: theme.shape.borderRadius,
  zIndex: '999',
  color: theme.palette.text.primary,
  cursor: 'pointer',

  fontWeight: '550',
  fontSize: '17px',
  fontFamily: 'sans-serif',
  lineHeight: '19.36px',
  color: '#040404',
}));

// ----------------------------------------------------------------------

export default function NewsLetter() {
  const [email, setEmail] = useState('');
  const submitEmail = async (email) => {
    try {
      const response = await jsonWebService.post('/user/newsletter', { email });
      if (response.ok) {
        console.log('Email submitted successfully!');
      } else {
        console.log('Failed to submit email:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };
  const handleSubmitEmail = (event) => {
    event.preventDefault();
    if (email.trim() !== '') {
      // Send the email to your backend or handle it as needed
      console.log(`Submitting email: ${email}`);
      submitEmail(email);
    }
    setEmail('');
  };

  return (
    <div role="newsLetter" className="new-letter">
      <NewsletterForm onSubmit={handleSubmitEmail}>
        <NewsletterInput
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="YOUR E-MAIL HERE"
          required
        />
        <NewsletterButton type="submit">SEND</NewsletterButton>
      </NewsletterForm>
    </div>
  );
}
