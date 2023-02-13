import React, { Component, useState } from 'react';
import { Navigate } from 'react-router-dom';

class AdminDashboard extends Component {
    // check loggedIn state and set it to false on logout
    state = {
        logout: false
    };

    handleLogout = () => {
        localStorage.removeItem('user');
        this.setState({ logout: true });
    };


    render() {
        const { logout } = this.state;
        if (logout) {
            return <Navigate to="/" />;
        }
        return (
            <div>
                <h1>Admin Dashboard</h1>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
}

export default AdminDashboard;