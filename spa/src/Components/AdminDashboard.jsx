/* 
    This component is the main dashboard for the admin user. It has the following requirements:
    1. Admin can create new labels.
    2. These labels are available to the user to assign to the images.
*/

import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './AdminDashboard.css';

class AdminDashboard extends Component {
    state = {
        logout: false,
        labels: [],
        newLabel: ''
    }


    // add a new method to import all the images from the src/images folder
    importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }

    componentDidMount() {
        const images = this.importAll(require.context('../../src/images', false, /\.(jpg)$/));
        // add the images to the images array from the src/images folder
        // set state in response to the images array
        // in the url property, path to the image is stored
        this.setState({
            images: Object.keys(images).map((image) => {
                return { id: image, url: images[image], label: null };
            })
        })
        console.log(images);
        // get the labels from current session
        if(sessionStorage.getItem('labels') ){
            this.setState({ labels: JSON.parse(sessionStorage.getItem('labels')) });
        }
    }

    // admin can create new labels
    // add a new method to handle the change in the input field
    handleNewLabelChange = (event) => {
        this.setState({ newLabel: event.target.value });
    }

    // add a new method to handle the click on the add label button
    handleNewLabelClick = () => {
        const { labels, newLabel } = this.state;
        if(!newLabel) return;
        // append the new label to the labels array
        labels.push(newLabel);
        // save the labels array to sessionStorage
        sessionStorage.setItem('labels', JSON.stringify(labels));
        // set the state in response to the labels array
        this.setState({ labels, newLabel: '' });
    } 

    handleLogout = () => {
        localStorage.removeItem('user');
        this.setState({ logout: true });
    };



    render() {
        const { logout, labels, images, newLabel } = this.state;
        if (logout) { 
            return <Navigate to="/" />
        }
        // add link for font awesome icon
        return (
            <div className="container">
                <div className="screen">
                    <div className="screen_content">
                        <h1 className='heading'>Admin Dashboard</h1>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder='Add new label' id="newLabel" value={newLabel} onChange={this.handleNewLabelChange} />
                            <button className="add-label-btn" onClick={this.handleNewLabelClick}><span>Add Label</span></button>
                        </div>
                        <div className="form-wrap">
                            <label htmlFor="labels" className='label-text'>Labels</label>
                            <select className="label-control" id="labels">
                                {labels.map((label) => {
                                    return <option key={label}>{label}</option>
                                })}
                            </select>
                        </div>
                        <div className='logout-container'>
                            {/* add font awesome icon with logout */}
                                <button className="logout-btn" onClick={this.handleLogout}>Logout
                                    {/* <i className="fas fa-sign-out-alt"></i> */}
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;