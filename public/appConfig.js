const APP_CONFIG = {

        // URL_WS: 'http://localhost:5001',
        // URL_IMG: 'http://localhost:3000',
        // URL_WS: 'http://102.110.0.33:8089/undp',
        // URL_IMG: 'http://102.110.0.33:8089/undp',
        // PUBLIC_URL: 'http://102.110.0.33:8089/undp/public',
      
        // LOGOUT_WS: '/authweb/logout',
}
const FEATURES = {

    // IS_ACTIVE_DASHBOARD_ITEMS: ['trainingExam', 'app', 'trainingDetails', 'chapterDetails', 'trainingTest', 'training'],
    // IS_ACTIVE_TRAINING_MANAGEMENT: ['trainingPackageManagement', 'trainingManagement', 'addTrainingPackage'],
}
sessionStorage.setItem('APP_CONFIG', JSON.stringify(APP_CONFIG));
sessionStorage.setItem('FEATURES_CONFIG', JSON.stringify(FEATURES));