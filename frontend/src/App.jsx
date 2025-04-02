import { useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This is a placeholder for authentication logic
  // In a real app, you would check for user tokens, etc.

  return (
    <div className='app-container'>
      {/* For now, we're just showing the LandingPage */}
      <LandingPage />

      {/* In the future, you would conditionally render based on auth status
      {isAuthenticated ? <Dashboard /> : <LandingPage />} */}
    </div>
  );
}

export default App;
