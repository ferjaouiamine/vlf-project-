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
import AlertConfirmDeleteUser from 'src/sections/@dashboard/user/AlertConfirmDeleteUser';
import AlertConfirmDeleteUsers from 'src/sections/@dashboard/user/AlertConfirmDeleteUsers';
import AddUserForm from 'src/sections/@dashboard/user/AddUserForm';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'prenom', label: 'First name', alignRight: false },
  { id: 'name', label: 'Last name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  // { id: 'username', label: 'Username', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  // {id:'tokenDevide', label: 'Token device', alignRight: false},
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

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [userList, setUserList] = useState([]);

  const [userLabel, setUserLabel] = useState('');

  const [userFirstName, setUserFirstName] = useState('');

  const [userLastName, setUserLastName] = useState('');

  const [userEmail, setUserEmail] = useState('');

  const [userPhone, setUserPhone] = useState('');

  const [spaceList, setSpaceList] = useState([]);

  const [editableRow, setEditableRow] = useState(undefined);

  const [openPopupDeleteUser, setOpenPopupDeleteUser] = useState(false);

  const [openPopupDeleteUsers, setOpenPopupDeleteUsers] = useState(false);

  const [userToDelete, setUserToDelete] = useState('');

  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const openAddUserForm = () => {
    setShowAddUserForm(true);
  };

  const handleOpenPopupDeleteUser = (row) => {
    setUserToDelete(row);
    setOpenPopupDeleteUser(true);
  };

  const handleOpenPopupDeleteUsers = (row) => {
    setOpenPopupDeleteUsers(true);
  };

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

  const handleUpdate = () => {
    // let newArr = [...userList];
    // var index = newArr.findIndex((item) => item._id === editableRow);
    // newArr[index].firstName = userFirstName;
    // newArr[index].lastname = userLastName;
    // newArr[index].email = userEmail;
    // newArr[index].phone = userPhone;
    // newArr[index].role = userRole;
    // setEditableRow(undefined);
    let data = {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      telephone: userPhone,
    };
    jsonWebService
      .post(`${URL_WS}/user/update/${editableRow}`, data)
      .then((response) => {
        setEditableRow(undefined);
        getUsers();
      })
      .catch((err) => {});
  };

  useEffect(() => {
    jsonWebService
      .get(`${URL_WS}/user/getAll`)
      .then((response) => {
        var res = response.data.map((user) => {
          return {
            ...user,
            label: `${user.firstName !== undefined ? user.firstName : ''} ${
              user.lastName !== undefined ? user.lastName : ''
            }`,
          };
        });
        setUserList(res);
      })
      .catch((err) => {});
  }, []);

  const getUsers = () => {
    jsonWebService
      .get(`${URL_WS}/user/getAll`)
      .then((response) => {
        var res = response.data.map((user) => {
          return {
            ...user,
            label: `${user.firstName !== undefined ? user.firstName : ''} ${
              user.lastName !== undefined ? user.lastName : ''
            }`,
          };
        });
        setUserList(res);
      })
      .catch((err) => {});
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: '#86B4FF' }}
            onClick={openAddUserForm}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add user
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleOpenPopupDeleteUsers={handleOpenPopupDeleteUsers}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  useCheckBox
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, firstName, lastName, email, telephone, tokenDevice, isBlocked } = row;
                    const isItemSelected = selected.indexOf(_id) !== -1;
                    if (editableRow === row._id && row._id) {
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, _id)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Input
                                type="text"
                                required="true"
                                value={userLastName}
                                onChange={(e) => setUserLastName(e.target.value)}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Input
                                type="text"
                                required="true"
                                value={userFirstName}
                                onChange={(e) => setUserFirstName(e.target.value)}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            <Input
                              type="text"
                              required="true"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Input
                              type="text"
                              required="true"
                              value={userPhone}
                              onChange={(e) => setUserPhone(e.target.value)}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Iconify
                              icon="eva:save-outline"
                              width={20}
                              height={20}
                              color="darkBlue"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                handleUpdate();
                              }}
                            />
                            <Iconify
                              icon="eva:close-circle-outline"
                              width={20}
                              height={20}
                              color="red"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                canselEditRow();
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    } else {
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          style={isBlocked ? { backgroundColor: '#D4E4EC' } : { backgroundColor: '#fff' }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, _id)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {lastName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {firstName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{telephone}</TableCell>
                          <TableCell align="left">
                            <Iconify
                              icon="eva:edit-2-outline"
                              width={20}
                              height={20}
                              color="gray"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                editRow(row);
                              }}
                            />
                            <Iconify
                              icon={!isBlocked ? 'material-symbols:lock' : 'material-symbols:lock-open'}
                              width={20}
                              height={20}
                              color="gray"
                              style={{ cursor: 'pointer' }}
                              onClick={(e) => handleOpenPopupDeleteUser(row)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    }
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
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <AlertConfirmDeleteUser
          openPopupDeleteUser={openPopupDeleteUser}
          setOpenPopupDeleteUser={setOpenPopupDeleteUser}
          userToDelete={userToDelete}
          getUsers={getUsers}
        />
        <AlertConfirmDeleteUsers
          openPopupDeleteUsers={openPopupDeleteUsers}
          setOpenPopupDeleteUsers={setOpenPopupDeleteUsers}
          selectedUsers={selected}
          getUsers={getUsers}
          setSelected={setSelected}
        />
        <AddUserForm showAddUserForm={showAddUserForm} setShowAddUserForm={setShowAddUserForm} getUsers={getUsers} />
      </Container>
    </Page>
  );
}
