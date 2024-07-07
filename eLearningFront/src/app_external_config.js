const APP_CONFIG = () => {
  let config = {};

  try {
    if (sessionStorage) {
      const appConfig = JSON.parse(sessionStorage.getItem('APP_CONFIG') || {});
      const features = JSON.parse(sessionStorage.getItem('FEATURES_CONFIG') || {});
      config = { ...appConfig, ...features };
    }
  } catch (e) {
    return {};
  }
  return config;
};

module.exports = APP_CONFIG;
