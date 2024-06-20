/* eslint-disable */
import * as React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
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
import ClientTrainingPackageComponent from 'src/components/trainingComponents/ClientTrainingPackageComponent';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Training() {
  const theme = useTheme();
  const { state } = useLocation();

  const [value, setValue] = React.useState(null);
  const [filter, setFilter] = React.useState('general');

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  return (
    <Page title="Training">
      <div className="routeStyle" style={{ marginLeft: '8%', marginTop: '3%', marginBottom: '3%' }}>
        Dashboard / Training Details / Chapters
      </div>
      <Container maxWidth="xl">
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          {state.chapters.map((c, i) => (
            <ClientTrainingComponent chapter={c} allChapters={state.chapters} chapterIndex={i} withTest />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
