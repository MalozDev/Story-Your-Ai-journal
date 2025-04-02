// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import SignUp from './components/SignUp/SignUp';
import WelcomeSuccess from './components/WelcomeSuccess/WelcomeSuccess';
import MainDashboard from './components/Dashboard/Dashboard';
import TimelinePage from './components/TimelinePage/TimelinePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/welcome' element={<WelcomeSuccess />} />
        <Route path='/dashboard' element={<MainDashboard />} />
        <Route path='/timeline' element={<TimelinePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
