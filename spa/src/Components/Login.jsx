import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password || !role) {
      setError('Please enter all the fields!');
    } else {
      setError('');
      // perform login check here
      // you can either check the credentials from a database or
      // hardcode the credentials in the code

      // Example of hardcoded credentials
      const adminCredentials = {
        username: 'admin',
        password: 'admin',
        role: 'admin'
      };
      const userCredentials = {
        username: 'user',
        password: 'user',
        role: 'user'
      };
      if (username === adminCredentials.username && password === adminCredentials.password && role === adminCredentials.role) {
        // redirect to admin page
        console.log('Admin Login Successful!');
      } else if (username === userCredentials.username && password === userCredentials.password && role === userCredentials.role) {
        // redirect to user page
        console.log('User Login Successful!');
      } else {
        setError('Invalid Credentials. Please try again!');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
