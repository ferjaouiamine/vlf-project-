/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Option = ({ children }) => (
  <React.Fragment>
    {children}
  </React.Fragment>
);

Option.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};


export default Option;
