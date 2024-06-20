/* eslint-disable */
import React, { Fragment } from 'react';
import cogoToast from 'cogo-toast';
import * as eventsService from '../infrastructure/sub-pub-events/eventsSystem';
import { NOTIFICATION_TOAST_EVENT } from '../infrastructure/sub-pub-events/eventTypes';


class Toasts extends React.Component {
  state = {
    hasToast: false,
    toastMessage: '',
    variant: 'info',
  };


  // eslint-disable-next-line react/sort-comp
  subscription;

  componentDidMount() {
    this.subscription = eventsService.subscribe(NOTIFICATION_TOAST_EVENT, (data) => {
      this.openToast(data);
    });
  }

  openToast(data) {
    this.setState({
      hasToast: true,
      variant: 'info',
      ...data,
    });
  }

  componentWillUnmount() {
    eventsService.unsubscribe(NOTIFICATION_TOAST_EVENT, this.subscription);
  }

  clearError() {
    this.setState({ hasToast: false });
  }

  Toasts = (hasToast, toastMessage, variant) => {
  
    let toast;
    switch (variant) {
      case 200:
        toast = cogoToast.success(toastMessage, {
          position: 'bottom-center',
          heading: 'SUCCESS',
        });
        break;
      case 'INFO':
        toast = cogoToast.info(toastMessage, {
          position: 'bottom-center',
          heading: variant,
          // icon: <i className="fas fa-check" />,
          // bar: { color: 'red' },
        });
        break;
      case 'loading':
        toast = cogoToast.loading(toastMessage, {
          position: 'bottom-center',
          heading: variant,
        });
        break;
      case 'FAILURE':
        toast = cogoToast.warn(toastMessage, {
          position: 'bottom-center',
          heading: variant,
        });
        break;
      case 'ERROR':
        toast = cogoToast.error(toastMessage, {
          position: 'bottom-center',
          heading: variant,
        });
        break;
      case 'Session expirée':
        toast = cogoToast.error(toastMessage, {
          position: 'bottom-center',
          heading: variant,
        });
        break;
      case 'server-error':
        toast = cogoToast.error(toastMessage, {
          position: 'bottom-center',
          heading: variant,
        });
        break;

      default:
        toast = cogoToast.error(toastMessage, {
          position: 'bottom-center',
          heading: variant,
        });
    }
    return toast;
  }

  render() {
    const { hasToast, toastMessage, variant } = this.state;
    if (hasToast) {
      this.Toasts(hasToast, toastMessage, variant);
    }
    return (
      <Fragment />
    );
  }
}

export default (Toasts);
