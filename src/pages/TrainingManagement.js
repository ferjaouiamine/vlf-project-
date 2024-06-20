/* eslint-disable */
import * as React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, ToggleButtonGroup, ToggleButton, Stack, Button } from '@mui/material';
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
import AdminTrainingComponent from 'src/components/trainingComponents/AdminTrainingComponent';
import { useState } from 'react';
import AddTrainingForm from 'src/sections/@dashboard/training/AddTrainingForm';
import { useLocation } from 'react-router-dom';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function TrainingManagement() {
  const theme = useTheme();
  const { state } = useLocation();
  const [filter, setFilter] = React.useState('general');

  const [showAddTrainingForm, setShowAddTrainingForm] = useState(false);
  const [chaptersList, setChaptersList] = useState(state.chapters);
  const [trainingId, setTrainingId] = useState(state._id);

  const openAddTrainingForm = () => {
    setShowAddTrainingForm(true);
  };

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  const getChapters = () => {
    jsonWebService
      .get(`${URL_WS}/training/${state._id}`)
      .then((response) => {
        setChaptersList(response.data.training.chapters);
      })
      .catch((err) => {});
  };
  const getData = () => {
    jsonWebService
      .get(`${URL_WS}/training`)
      .then((response) => {
        setListTraining(response.data.trainings);
      })
      .catch((err) => {});
  };
  const loadMore = () => {
    setIndex(index + 49);
    if (index >= listTraining.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  useEffect(() => {
    getData();
    getChapters();
  }, []);
  return (
    <Page title="Training management">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chapter management
          </Typography>
          <Button variant="contained" onClick={openAddTrainingForm} startIcon={<Iconify icon="eva:plus-fill" />}>
            Add chapter
          </Button>
        </Stack>
        <Grid container spacing={2} alignItems="center">
          {chaptersList.map((c) => (
            <AdminTrainingComponent trainingId={trainingId} chapter={c} getChapters={(e) => getChapters()} />
          ))}
        </Grid>

        <AddTrainingForm
          showAddTrainingForm={showAddTrainingForm}
          setShowAddTrainingForm={setShowAddTrainingForm}
          getTraining={getChapters}
          trainingId={trainingId}
        />
      </Container>
    </Page>
  );
}
