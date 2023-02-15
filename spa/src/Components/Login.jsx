import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// add style from Login.css
import './Login.css';
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
        <div class="container">
            <div class="screen">
                <div class="screen__content">
                    <form className="login" onSubmit={handleSubmit}>
                        <div class="login__field">
                            <i class="login__icon fas fa-user"></i>
                            <input type="text" class="login__input"  placeholder="Enter User Id" value={userId} onChange={(e) => setUserId(e.target.value)} />
                        </div>
                        <div class="login__field">
                            <i class="login__icon fas fa-lock"></i>
                            <input type="password" class="login__input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div class="login__field">
                            <i class="login__icon fas fa-user"></i>
                            <select class="login__input" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <button class="button login__submit">
                            <span class="button__text">Log In Now</span>
                            <i class="button__icon fas fa-chevron-right"></i>
                        </button>				
                    </form>
                </div>
                <div class="screen__background">
                    <span class="screen__background__shape screen__background__shape4"></span>
                    <span class="screen__background__shape screen__background__shape3"></span>		
                    <span class="screen__background__shape screen__background__shape2"></span>
                    <span class="screen__background__shape screen__background__shape1"></span>
                </div>		
            </div>
        </div>
    );
};

export default Login;