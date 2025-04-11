import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import SignUp from './components/SignUp/SignUp';
import WelcomeSuccess from './components/WelcomeSuccess/WelcomeSuccess';
import MainDashboard from './components/Dashboard/Dashboard';
import TimelinePage from './components/TimelinePage/TimelinePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Insights from './components/Insights/Insights';
import KnowMe from './components/KnowMe/knowMe';
import Goals from './components/Goals/Goals';
import LoginPage from './components/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter basename='/Story-Your-Ai-journal'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/welcome' element={<WelcomeSuccess />} />
        <Route path='/dashboard' element={<MainDashboard />} />
        <Route path='/timeline' element={<TimelinePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/insights' element={<Insights />} />
        <Route path='/knowme' element={<KnowMe />} />
        <Route path='/goals' element={<Goals />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
