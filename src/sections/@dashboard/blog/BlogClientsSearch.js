/* eslint-disable */
import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, createFilterOptions, InputAdornment, Popper, TextField } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

BlogClientsSearch.propTypes = {
  data: PropTypes.array.isRequired,
};

export default function BlogClientsSearch({ data, setData, handleReset, setSearchFilter, setClientSearch }) {
  const OPTIONS_LIMIT = 10;
const defaultFilterOptions = createFilterOptions();

const filterOptions = (options, state) => {
  return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};
  return (
    <Autocomplete
      sx={{ width: 280, marginTop:'-3%', marginBottom:'1%' }}
      onChange={(event, newValue) => {
        if (newValue) {
          setSearchFilter(true)
          setData(data.filter((item) => item.orderer.name === newValue.orderer.name));
          setClientSearch(newValue.orderer.name)
        } else {
          handleReset();
        }
      }}
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={data}
      getOptionLabel={(data) => data.orderer.name}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      filterOptions={filterOptions}
      // filterOptions={(options, state) => filterOptions(options, state)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Chercher client..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
