import { useState } from 'react';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Sidebar from './components/Sidebar';
import Mealplan from './components/Mealplan';
import { login } from './services/nutri/nutrtiServices';
import './App.css';

function App() {
  const token = Cookies.get('token');
  const [mealPlans, setMealPlans] = useState([]);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const accessToken = await login(loginData.email, loginData.password);
      Cookies.set('token', accessToken);
      window.location.reload();
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  if (!token) {
    return (
      <Box sx={{ p: 3 }}>
        <h1>Please log in</h1>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            margin="normal"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            margin="normal"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Log In
          </Button>
        </form>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar setMealPlans={setMealPlans} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>Meal Planner</h1>
        {mealPlans.length > 0 ? (
          // Pass the mealPlans returned from Sidebar to Mealplan component
          <Mealplan mealPlanData={{ mealPlans }} />
        ) : (
          <p>No meal plans yet. Submit the form to generate a meal plan.</p>
        )}
      </Box>
    </Box>
  );
}

export default App;
