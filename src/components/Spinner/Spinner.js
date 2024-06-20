import React from 'react';
import classNames from 'classnames';
import './loadingSpinner.scss';

const LoadingSpinner = ({ type }) => (
  <div
    className={classNames(
      { 'spinner-loading spinner-type-default': type === 'default' },
      { 'spinner-loading spinner-type-big': type === 'big' },
      { 'spinner-loading spinner-type-default-small': type === 'small' },
      { 'spinner-loading spinner-type-button': type === 'button' },
      { 'spinner-loading spinner-type-badge': type === 'badge' }
    )}
  />
);

LoadingSpinner.defaultProps = {
  type: 'default',
};

export default LoadingSpinner;
