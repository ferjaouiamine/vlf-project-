/* eslint-disable */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { slice } from 'lodash';
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
  Button,
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
import './home.scss';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import LoadingSpinner from 'src/components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [filter, setFilter] = useState('general');
  const [listTraining, setListTraining] = useState([]);
  const [category, setCategory] = useState('');
  const [initialTrainingList, setInitialTrainingList] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(6);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = () => {
    jsonWebService
      .get(`${URL_WS}/training`)
      .then((response) => {
        setListTraining(response.data.trainings);
        setLoading(false);
        setInitialTrainingList(response.data.trainings); // Update initialTrainingList with the full list
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

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    if (selectedCategory) {
      const filteredList = listTraining.filter((training) => training.trainingCategorie == selectedCategory);
      setInitialTrainingList(filteredList);
    } else {
      setInitialTrainingList(listTraining);
    }
  };

  const testPeerConn = () => {
    navigate('/dashboard/roomChat', { replace: true });
    setTimeout(() => window.location.reload(), 5000);
  };

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl" style={{ overflow: 'hidden' }}>
        <div className="parent">
          <div className="div2">
            <div className="learningRafiki">
              <img src={process.env.PUBLIC_URL + '/images/learningRafiki.svg'} alt="" />
            </div>
          </div>
          <div className="div1">
            <div className="textHeader">
              Develop Your<span style={{ color: '#39bbd5' }}> Skills </span>By
              <br />
              <span> Getting A Full Access To </span>
              <br />
              Our<span style={{ color: '#39bbd5' }}> Online Courses</span>
            </div>
          </div>
        </div>
        <center>
          <FormControl style={{ width: '20%', marginBottom: '6%' }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              onChange={handleChange}
              value={category}
            >
              <MenuItem value={'community social entrepreneurs'}>community social entrepreneurs</MenuItem>
              <MenuItem value={'non-profit social entrepreneurs'}>non-profit social entrepreneurs</MenuItem>
              <MenuItem value={'transformational social entrepreneurs'}>
                {' '}
                transformational social entrepreneurs
              </MenuItem>
            </Select>
          </FormControl>
          {/* <div>
          <Button
                  variant="contained"
                  style={{ marginTop: '1%', backgroundColor: '#dda902' }}
                  onClick={(e) => testPeerConn()}
                >
                 Test peer connection
                </Button>
          </div> */}
        </center>
        <FormControl style={{ width: '20%', marginBottom: '6%' }}>
          <span
            style={{
              fontFamily: 'sans-serif',
              fontWeight: '500',
              fontSize: '39px',
              textTransform: 'capitalize',
              fontStyle: 'normal',
              color: '#040404',
            }}
          >
            {' '}
            Best Sellers{' '}
          </span>
        </FormControl>
        {loading ? (
          <LoadingSpinner type="big" />
        ) : initialTrainingList.length > 0 ? (
          <Grid container spacing={0} alignItems="center">
            {initialTrainingList.slice(0, index).map((t) => (
              <ClientTrainingPackageComponent training={t} withTest />
            ))}
          </Grid>
        ) : (
          <center>
            <Typography variant="h4">No training available for the selected category.</Typography>
          </center>
        )}
        <center>
          {!isCompleted && (
            <Button
              variant="contained"
              style={{ width: '195px', marginTop: '5%', marginBottom: '5%', backgroundColor: '#86B4FF' }}
              onClick={loadMore}
            >
              Show more
            </Button>
          )}
        </center>
        <FormControl style={{ width: '20%', marginBottom: '6%' }}>
          <span
            style={{
              fontFamily: 'sans-serif',
              fontWeight: '500',
              fontSize: '39px',
              textTransform: 'capitalize',
              fontStyle: 'normal',
              color: '#040404',
            }}
          >
            {' '}
            Discover more{' '}
          </span>
        </FormControl>
        {
          loading ? (
            <LoadingSpinner type="big" />
          ) : initialTrainingList.length > 0 ? (
            <Grid container spacing={0} alignItems="center">
              {initialTrainingList.map((t) => (
                <ClientTrainingPackageComponent training={t} withTest />
              ))}
            </Grid>
          ) : (
            <center>
              <Typography variant="h4">No training available for the selected category.</Typography>
            </center>
          )
          /* <center>
          {!isCompleted && (
            <Button
              variant="contained"
              style={{ width: '195px', marginTop: '5%', marginBottom: '5%', backgroundColor: '#86B4FF' }}
              // onClick={loadMore}
            >
              Show more
            </Button>
          )}
        </center> */
        }
      </Container>
    </Page>
  );
}
