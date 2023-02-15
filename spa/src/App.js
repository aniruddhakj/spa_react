import './App.css';
import React, { Component } from 'react';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// set default path to login
class App extends Component {
	render() {
		return (
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path='/login' element={<Login />}/>
					<Route path="/user" element={<UserDashboard />} />
					<Route path="/admin" element={<AdminDashboard />} />
				</Routes>
			</Router>
		);
	}
}

export default App;
