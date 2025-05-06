// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import SignUp from './components/SignUp/SignUp';
import WelcomeSuccess from './components/WelcomeSuccess/WelcomeSuccess';
import Login from './components/Login/Login';
import Journal from './components/Journal/Journal'; // You can link this to Timeline or another journaling section
import LandingPage from './components/LandingPage/LandingPage';
import MainDashboard from './components/Dashboard/Dashboard';
import TimelinePage from './components/TimelinePage/TimelinePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Insights from './components/Insights/Insights';
import KnowMe from './components/KnowMe/knowMe';
import Goals from './components/Goals/Goals';
import Welcome from './components/Welcome/Welcome'


// 🔐 Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return currentUser ? children : <Navigate to="/login" />;
};

// 🎬 Animated Routes Component
const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<WelcomeSuccess />} />
        <Route path='/welcomecontext' element={<Welcome/>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timeline"
          element={
            <ProtectedRoute>
              <TimelinePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />
        <Route
          path="/knowme"
          element={
            <ProtectedRoute>
              <KnowMe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

// 🧠 Root App component
function App() {
  return (
    <Router basename="/Story-Your-Ai-journal">
      <AuthProvider>
        <div className="app">
          <AnimatedRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
