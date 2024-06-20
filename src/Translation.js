/* eslint-disable */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Translation = ({ message }) => {
  const { t, i18n, ready } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage('fr');
  }, []);

  if (ready) {
    return t(message);
  }
};

export default Translation;
