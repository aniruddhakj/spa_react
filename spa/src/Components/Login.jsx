import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';


// add sample data for users and admins
const users = [
    {
        userId: 'user1',
        password: 'user1',
        role: 'user'
    },
    {
        userId: 'user2',
        password: 'user2',
        role: 'user'
    }
];

const admins = [
    {
        userId: 'admin1',
        password: 'admin1',
        role: 'admin'
    },
    {
        userId: 'admin2',
        password: 'admin2',
        role: 'admin'
    }
];



const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    // select the role from the dropdown containing user and admin
    const [role, setRole] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            userId,
            password,
            role
        };
        // check if the user is an admin or a user
        if (role === 'admin') {
            const admin = admins.find((admin) => admin.userId === userId && admin.password === password);
            if (admin) {
                localStorage.setItem('user', JSON.stringify(admin));
                setLoggedIn(true);
            } else {
                setError('Invalid Credentials');
				// display error message as a popup
				alert('Please enter valid credentials');
            }
        } else if (role === 'user') {
            const user = users.find((user) => user.userId === userId && user.password === password);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                setLoggedIn(true);
            } else {
                setError('Invalid Credentials');
				// display error message as an alert
				alert('Please enter valid credentials');
            }
        }
    };
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setLoggedIn(true);
        }
    }, []);

    if (loggedIn) { 
      // check role and redirect to admin or user dashboard
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'admin') {
        return <Navigate to="/admin" />;
      } 
      return <Navigate to="/user" />;
    }
    return (
        <div>
            <h3>Login</h3>  
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userId">UserId</label>
                    <input type="text" className="form-control" id="userId" placeholder="Enter User Id" value={userId} onChange={(e) => setUserId(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;