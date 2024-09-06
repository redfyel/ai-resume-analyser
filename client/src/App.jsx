import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './components/landing/Landing';
import ProfilePage from './components/job-profile/ProfilePage';
import FeedPage from './components/feed-page/FeedPage';
import JobAlertsPage from './components/job-alerts/JobAlertsPage';
import UploadResumePage from './components/upload-resume/UploadResumePage';
import AnalysisReportPage from './components/analysis/AnalysisReportPage';
import RootLayout from './RootLayout';

function App() {
  const browserRouter = createBrowserRouter([
    {
      path : '/',
      element : <RootLayout />,
      children : [
        {
          path : '/',
          element : <Landing />
        },
        {
          path : 'upload-resume',
          element : <UploadResumePage />
        },
        {
          path : 'job-alerts',
          element : <JobAlertsPage />
        },
        {
          path : 'analysis',
          element : <AnalysisReportPage />
        },
        {
          path : 'profile',
          element : <ProfilePage />
        },
        {
          path : 'feed',
          element : <FeedPage />
        }
      ]
    },
  ])
  return (
    <div className="main">
      <RouterProvider router = {browserRouter} />
    </div>
  );
}

export default App;
