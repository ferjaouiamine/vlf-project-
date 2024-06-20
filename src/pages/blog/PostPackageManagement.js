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
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
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
} from '../../sections/@dashboard/app';
import AdminTrainingComponent from 'src/components/trainingComponents/AdminTrainingComponent';
import AddTrainingForm from 'src/sections/@dashboard/training/AddTrainingForm';
import AdminTrainingPackageComponent from 'src/components/trainingComponents/AdminTrainingPackageComponent';
import AddTrainingPackageForm from 'src/sections/@dashboard/training/AddTrainingPackageForm';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import { initial, slice } from 'lodash';
import LoadingSpinner from 'src/components/Spinner/Spinner';
import AdminPostPackageComponent from './AdminPostPackageComponent';
import AdminPostPackageComponentManagement from './AdminPostPackageComponent';

// ----------------------------------------------------------------------

export default function PostPackageManagement() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [filter, setFilter] = React.useState('general');
  const [listPost, setListPost] = useState([]);
  const [showAddPosForm, setShowAddPosForm] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(6);
  const initialPostList = slice(listPost, 0, index);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = () => {
    jsonWebService
      .get(`${URL_WS}/post`)
      .then((response) => {
        setListPost(response.data.posts);
      })
      .catch((err) => {});
  };

  const openAddTrainingPackageForm = () => {
    setShowAddTrainingPackageForm(true);
  };

  const openAddPostPage = () => {
    navigate('/dashboard/PostManagement', { replace: true });
  };

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  const getPost = () => {};
  const getData = () => {
    jsonWebService
      .get(`${URL_WS}/post`)
      .then((response) => {
        setLoading(false);
        setListPost(response.data.posts);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const loadMore = () => {
    setIndex(index + 5);
    if (index >= listPost.length) {
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
          <Typography variant="h4" color={'black'} gutterBottom>
            Post management
          </Typography>
          <Button variant="contained" onClick={openAddPostPage} startIcon={<Iconify icon="eva:plus-fill" />}>
            Add a new post
          </Button>
        </Stack>
        <center>
          <Typography marginBottom={'5rem'} variant="h2" color={'#86b4ff'} gutterBottom>
            Posts list
          </Typography>
        </center>
        {loading ? (
          <LoadingSpinner type="big" />
        ) : (
          <Grid container spacing={0}>
            {initialPostList.map((t) => (
              <AdminPostPackageComponentManagement post={t} getPostList={(e) => getPostList()} />
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
        {/* <AddTrainingPackageForm
          showAddTrainingPackageForm={showAddTrainingPackageForm}
          setShowAddTrainingPackageForm={setShowAddTrainingPackageForm}
          getTraining={getPost}
        /> */}
      </Container>
    </Page>
  );
}
