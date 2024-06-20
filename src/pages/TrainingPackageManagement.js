/* eslint-disable */
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
import AddTrainingForm from 'src/sections/@dashboard/training/AddTrainingForm';
import AdminTrainingPackageComponent from 'src/components/trainingComponents/AdminTrainingPackageComponent';
import AddTrainingPackageForm from 'src/sections/@dashboard/training/AddTrainingPackageForm';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import { slice } from 'lodash';
import LoadingSpinner from 'src/components/Spinner/Spinner';

// ----------------------------------------------------------------------

export default function TrainingPackageManagement() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [filter, setFilter] = React.useState('general');
  const [listTraining, setListTraining] = useState([]);
  const [showAddTrainingPackageForm, setShowAddTrainingPackageForm] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(6);
  const initialTrainingList = slice(listTraining, 0, index);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getTrainingList();
  }, []);

  const getTrainingList = () => {
    jsonWebService
      .get(`${URL_WS}/training`)
      .then((response) => {
        setListTraining(response.data.trainings);
      })
      .catch((err) => {});
  };

  const openAddTrainingPackageForm = () => {
    setShowAddTrainingPackageForm(true);
  };

  const openAddTrainingPackagePage = () => {
    navigate('/dashboard/addTrainingPackage', { replace: true });
  };

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  const getTraining = () => {};
  const getData = () => {
    jsonWebService
      .get(`${URL_WS}/training`)
      .then((response) => {
        setLoading(false);
        setListTraining(response.data.trainings);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const loadMore = () => {
    setIndex(index + 9);
    if (index >= listTraining.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  return (
    <Page title="Training management">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Training package management
          </Typography>
          <Button variant="contained" onClick={openAddTrainingPackagePage} startIcon={<Iconify icon="eva:plus-fill" />}>
            Add training package
          </Button>
        </Stack>
        {loading ? (
          <LoadingSpinner type="big" />
        ) : (
          <Grid container spacing={0}>
            {initialTrainingList.map((t) => (
              <AdminTrainingPackageComponent training={t} getTrainingList={(e) => getTrainingList()} />
            ))}
          </Grid>
        )}
        <center>
          {!isCompleted && (
            <Button
              variant="contained"
              style={{ width: '195px', marginTop: '5%', marginBottom: '5%', backgroundColor: '#86b4ff' }}
              onClick={loadMore}
            >
              Show more
            </Button>
          )}
        </center>
        <AddTrainingPackageForm
          showAddTrainingPackageForm={showAddTrainingPackageForm}
          setShowAddTrainingPackageForm={setShowAddTrainingPackageForm}
          getTraining={getTraining}
        />
      </Container>
    </Page>
  );
}
