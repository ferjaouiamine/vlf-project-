/* eslint-disable */
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, ToggleButtonGroup, ToggleButton, Stack, Button } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import { initial, slice } from 'lodash';
import LoadingSpinner from 'src/components/Spinner/Spinner';
import AdminSponsorPackageComponent from './AdminSponsorPackageComponent';

// ----------------------------------------------------------------------

export default function SponsorPackageManagement() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [filter, setFilter] = React.useState('general');
  const [listSponsor, setListSponsor] = useState([]);
  const [showAddPosForm, setShowAddPosForm] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(6);
  const initialSponsorList = slice(listSponsor, 0, index);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getSponsorList();
  }, []);

  const getSponsorList = () => {
    jsonWebService
      .get(`${URL_WS}/sponsor`)
      .then((response) => {
        setListSponsor(response.data.sponsors);
      })
      .catch((err) => {});
  };

  const openAddTrainingPackageForm = () => {
    setShowAddTrainingPackageForm(true);
  };

  const openAddSponsorPage = () => {
    navigate('/dashboard/SponsorManagement', { replace: true });
  };

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  const getSponsor = () => {};
  const getData = () => {
    jsonWebService
      .get(`${URL_WS}/sponsor`)
      .then((response) => {
        setLoading(false);
        setListSponsor(response.data.sponsors);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const loadMore = () => {
    setIndex(index + 5);
    if (index >= listSponsor.length) {
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
            Sponsoring management
          </Typography>
          <Button variant="contained" onClick={openAddSponsorPage} startIcon={<Iconify icon="eva:plus-fill" />}>
            Add a new Sponsor banner
          </Button>
        </Stack>
        <center>
          <Typography marginBottom={'5rem'} variant="h2" color={'#86b4ff'} gutterBottom>
            Sponsors list
          </Typography>
        </center>
        {loading ? (
          <LoadingSpinner type="big" />
        ) : (
          <Grid container spacing={0}>
            {initialSponsorList.map((t) => (
              <AdminSponsorPackageComponent sponsor={t} getSponsorList={(e) => getSponsorList()} />
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
