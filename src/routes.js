/* eslint-disable */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import ResetPassword from './pages/ResetPassword';
import { ProtectedRoute } from './ProtectedRoute';
import TrainingTestPage from './pages/TrainingTestPage';
import MyTraining from './pages/MyTraining';
import TrainingManagement from './pages/TrainingManagement';
import TrainingPackageManagement from './pages/TrainingPackageManagement';
import Training from './pages/Training';
import AddTrainingPackage from './pages/AddTrainingPackage';
import ClientTrainingDetails from './pages/TrainingDetails';
import ClientChapterDetails from './components/trainingComponents/ClientChapterDetails';
import ChangePassword from './pages/ChangePassword';
import LandingPage from './pages/LandingPage';
import ExamTestPage from './pages/ExamTestPage';
import ConsultantsPage from './pages/ConsultantsPage';
import ConsultantDetails from './pages/ConsultantDetails';
import MyConsultantDetails from './components/ConsultantComponents/MyConsultantDetails';
import Lobby from './pages/peerConn/Lobby';
import Room from './pages/peerConn/Room';
import RoomChat from './pages/WSMeeting/RoomChat';
import MeetingsPage from './pages/MeetingsPage';
import ConsultantMeetingPage from './pages/ConsultantMeetingPage';
import ClientMeetingPage from './pages/ClientMeetingPage';
import BlogManagement from './pages/blog/BlogManagement';
import BlogPageDetails from './pages/blog/BlogPageDetails';
import PostManagement from './pages/blog/PostManagement';
import SponsorManagement from './pages/SponsorsPage/SponsorManagement';
import BlogAddPost from './pages/blog/BlogAddPost';
import PostPackageManagement from './pages/blog/PostPackageManagement';
import BlogPage from './pages/blog/BlogPage';
import SponsorPackageManagement from './pages/SponsorsPage/SponsorPackageManagement';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'app',
          element: (
            <ProtectedRoute>
              <DashboardApp />
            </ProtectedRoute>
          ),
        },
        { path: 'user', element: <User /> },
        { path: 'meetings', element: <MeetingsPage /> },
        { path: 'consultantMeetings', element: <ConsultantMeetingPage /> },
        { path: 'clientMeetings', element: <ClientMeetingPage /> },
        { path: 'trainingTest', element: <TrainingTestPage /> },
        { path: 'trainingExam', element: <ExamTestPage /> },
        { path: 'myTraining', element: <MyTraining /> },
        { path: 'trainingManagement', element: <TrainingManagement /> },
        { path: 'consultants', element: <ConsultantsPage /> },
        { path: 'consultantDetails', element: <ConsultantDetails /> },
        { path: 'BlogManagement', element: <BlogManagement /> },
        { path: 'PostManagement', element: <PostManagement /> },
        { path: 'SponsorManagement', element: <SponsorManagement /> },
        { path: 'BlogAddPost', element: <BlogAddPost /> },
        { path: 'PostPackageManagement', element: <PostPackageManagement /> },
        { path: 'SponsorPackageManagement', element: <SponsorPackageManagement /> },
        { path: 'BlogPageDetails', element: <BlogPageDetails /> },
        { path: 'BlogPage', element: <BlogPage /> },
        { path: 'trainingPackageManagement', element: <TrainingPackageManagement /> },
        { path: 'myConsultantDetails', element: <MyConsultantDetails /> },
        { path: 'training', element: <Training /> },
        { path: 'trainingDetails', element: <ClientTrainingDetails /> },
        { path: 'addTrainingPackage', element: <AddTrainingPackage /> },
        { path: 'chapterDetails', element: <ClientChapterDetails /> },
        { path: 'changePassword', element: <ChangePassword /> },
        { path: 'lobby', element: <Lobby /> },
        { path: 'room', element: <Room /> },
        { path: 'roomChat', element: <RoomChat /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'resetPassword',
      element: <ResetPassword />,
    },
    { path: 'register', element: <Register /> },
    {
      path: '/',
      // element: <LogoOnlyLayout />,
      element: <LandingPage />,
      children: [
        // { path: '/', element: <Navigate to="/login" /> },
        { path: '/', element: <Navigate to="/home" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // { path: 'consultants', element: <ConsultantsPage /> },
    // { path: 'consultantDetails', element: <ConsultantDetails /> },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
