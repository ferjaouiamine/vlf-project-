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
import ResetPassword from './pages/ResetPassword';
import { ProtectedRoute } from './ProtectedRoute';
import ChangePassword from './pages/ChangePassword';
import LandingPage from './pages/LandingPage';
import ConsultantsPage from './pages/ConsultantsPage';
import ConsultantDetails from './pages/ConsultantDetails';
import MyConsultantDetails from './components/ConsultantComponents/MyConsultantDetails';
import Lobby from './pages/peerConn/Lobby';
import Room from './pages/peerConn/Room';
import RoomChat from './pages/WSMeeting/RoomChat';
import MeetingsPage from './pages/MeetingsPage';
import ConsultantMeetingPage from './pages/ConsultantMeetingPage';
import ClientMeetingPage from './pages/ClientMeetingPage';

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
              <ConsultantsPage/>
            </ProtectedRoute>
          ),
        },
        { path: 'user', element: <User /> },
        { path: 'meetings', element: <MeetingsPage /> },
        { path: 'consultantMeetings', element: <ConsultantMeetingPage /> },
        { path: 'clientMeetings', element: <ClientMeetingPage /> },
        { path: 'consultants', element: <ConsultantsPage /> },
        { path: 'consultantDetails', element: <ConsultantDetails /> },
        { path: 'myConsultantDetails', element: <MyConsultantDetails /> },
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
