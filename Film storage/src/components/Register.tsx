import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { useAuth } from './AuthContext';

const Register  = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = { username, password: hashedPassword, role: 'user' };
      
      await axios.post('http://localhost:5000/users', newUser);
      
      login({ username, role: 'user' });
      history.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
