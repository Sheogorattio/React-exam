import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { useAuth } from './AuthContext';

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

const Login  = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get<User[]>(`http://localhost:5000/users?username=${username}`);//`${process.env.API_URL}/users?username=${username}
      const user = response.data[0];

      if (user && bcrypt.compareSync(password, user.password)) {
        login({ username: user.username, role: user.role });
        history.push('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
