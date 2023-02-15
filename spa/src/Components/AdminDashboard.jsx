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
        // in the url property, set the path to the image
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
        return (
            <div className="container">
                <div className="screen">
                    <div className="screen_content">
                        <h1>Admin Dashboard</h1>
                        <div className="form-group">
                            <label htmlFor="newLabel">Add a new label</label>
                            <input type="text" className="form-control" id="newLabel" value={newLabel} onChange={this.handleNewLabelChange} />
                            <button className="add-label-btn" onClick={this.handleNewLabelClick}>Add Label</button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="labels">Labels</label>
                            <select className="form-control" id="labels">
                                {labels.map((label) => {
                                    return <option key={label}>{label}</option>
                                })}
                            </select>
                        </div>
                        <button className="logout-btn" onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
                {/* <div className="row">
                    {images && images.map((image) => {
                        return (
                            <div className="col-4" key={image.id}>
                                <img src={image.url} alt={image.id} width={360} className="img-fluid" />
                            </div>
                        )
                    })}
                </div> */}
            </div>
        );
    }
}

export default AdminDashboard;