/* eslint-disable */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Input,
  Autocomplete,
  TextField,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { jsonWebService } from 'src/infrastructure/web-service';
import { URL_WS } from 'src/constants';
import AlertMeetingDetail from 'src/sections/@dashboard/meeting/AlertMeetingDetail';
import moment from 'moment';
import AlertPayment from 'src/sections/@dashboard/meeting/AlertPayment';
import AlertDeleteMeeting from 'src/sections/@dashboard/meeting/AlertDeleteMeeting';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'user', label: 'User', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'consultant', label: 'Consultant', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.label.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function MeetingsPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [meetingsList, setMeetingsList] = useState([]);

  const [meetingDetail, setMeetingDetail] = useState();

  const [consultantsList, setConsultantsList] = useState([]);

  const [openPopupMeetingDetail, setOpenPopupMeetingDetail] = useState(false);

  const [openPopupDeleteMeeting, setOpenPopupDeleteMeeting] = useState(false);

  const [openPopupPayment, setOpenPopupPayment] = useState(false);

  const editRow = (row) => {
    setEditableRow(row._id);
    setUserFirstName(row.firstName);
    setUserLastName(row.lastName);
    setUserEmail(row.email);
    setUserPhone(row.telephone);
  };

  const canselEditRow = () => {
    setEditableRow(undefined);
  };

  useEffect(() => {
    getAllMeetings();
    getConsultants();
  }, []);

  const getAllMeetings = () => {
    jsonWebService
      .get(`${URL_WS}/meeting`)
      .then((response) => {
        setMeetingsList(response.data.meetings);
      })
      .catch((err) => {});
  };

  const getConsultants = () => {
    jsonWebService
      .get(`${URL_WS}/user/getAll`)
      .then((response) => {
        let ConsultantData = response.data;
        let consultantList = ConsultantData.filter((e) => e.role === 'consultant');
        setConsultantsList(consultantList);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const selectedRow = (row) => {
    setMeetingDetail(row);
    setOpenPopupMeetingDetail(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handlePayment = (e, sts, row) => {
    e.stopPropagation();
    if (sts === 'validation') {
      setMeetingDetail(row);
      setOpenPopupPayment(true);
    } else {
      alert('vous etes dans le status ' + sts);
    }
  };

  const handleDeleteMeeting = (e, sts, row) => {
    e.stopPropagation();
    if (sts !== 'payed') {
      setMeetingDetail(row);
      setOpenPopupDeleteMeeting(true);
    } else {
      alert('vous etes dans le status ' + sts);
    }
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Meetings List
          </Typography>
        </Stack>

        <Card>
          {/* <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={meetingsList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {meetingsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, user, category, date, consultant, status } = row;
                    const isItemSelected = selected.indexOf(_id) !== -1;
                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        onClick={(e) => selectedRow(row)}
                      >
                        <TableCell component="th" scope="row" padding="none" style={{ paddingLeft: '1%' }}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {user[0].firstName} {user[0].lastName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {category}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{moment(date).format('YYYY-MM-DD HH:mm')}</TableCell>
                        <TableCell align="left">{status}</TableCell>
                        <TableCell align="left">
                          {consultant ? consultant[0]?.firstName : ''} {consultant ? consultant[0]?.lastName : ''}
                        </TableCell>
                        <TableCell align="left">
                          <Iconify
                            icon="streamline:money-cash-dollar-coin-accounting-billing-payment-cash-coin-currency-money-finance"
                            width={20}
                            height={20}
                            color={status === 'validation' ? '#85BB65' : 'gray'}
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handlePayment(e, status, row)}
                          />
                          <Iconify
                            icon={'material-symbols:cancel-outline'}
                            width={20}
                            height={20}
                            color={status === 'payed' ? 'gray' : 'red'}
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleDeleteMeeting(e, status, row)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

                {/* {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={meetingsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        <AlertMeetingDetail
          openPopupMeetingDetail={openPopupMeetingDetail}
          setOpenPopupMeetingDetail={setOpenPopupMeetingDetail}
          selectedMeeting={meetingDetail}
          consultantsList={consultantsList}
          getAllMeetings={getAllMeetings}
        />
        <AlertPayment
          openPopupPayment={openPopupPayment}
          setOpenPopupPayment={setOpenPopupPayment}
          selectedMeeting={meetingDetail}
          getAllMeetings={getAllMeetings}
        />
        <AlertDeleteMeeting
          openPopupDeleteMeeting={openPopupDeleteMeeting}
          setOpenPopupDeleteMeeting={setOpenPopupDeleteMeeting}
          selectedMeeting={meetingDetail}
          getAllMeetings={getAllMeetings}
        />
      </Container>
    </Page>
  );
}
