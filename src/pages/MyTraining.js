/* eslint-disable */
import * as React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, ToggleButtonGroup, ToggleButton, Stack } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import ClientTrainingComponent from 'src/components/trainingComponents/ClientTrainingComponent';

// ----------------------------------------------------------------------

export default function MyTraining() {
  const theme = useTheme();
  const [value, setValue] = React.useState(null);
  const [filter, setFilter] = React.useState('general');

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  return (
    <Page title="MyTraining">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" style={{ marginLeft: '30%', marginTop: '5%' }} gutterBottom>
            This page is under construction, it will be ready soon.
          </Typography>
        </Stack>
        {/* <ClientTrainingComponent /> */}
      </Container>
    </Page>
  );
}
