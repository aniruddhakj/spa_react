import './App.css';
import React, { Component } from 'react';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Switch is replaced by Routes
class App extends Component {
  render() {
	return (
	  <Router>
		<div className="App">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/user" element={<UserDashboard />} />
				<Route path="/admin" element={<AdminDashboard />} />
		  	</Routes>
		</div>
	  </Router>
	);
  }
}

export default App;
