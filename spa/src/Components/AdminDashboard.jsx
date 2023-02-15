/* 
    This component is the main dashboard for the admin user. It has the following requirements:
    1. Admin can create new labels.
    2. These labels are available to the user to assign to the images.
*/

import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class AdminDashboard extends Component {
    state = {
        logout: false,
        labels: [],
        newLabel: ''
    }
    // save the labels somewhere so that they are available to the user

    // add a new method to get the labels from localStorage
    getLabels = () => {
        const labels = JSON.parse(localStorage.getItem('labels'));
        if (labels) {
            this.setState({ labels });
        }
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
    }

    // admin can create new labels
    // add a new method to handle the change in the input field
    handleNewLabelChange = (event) => {
        this.setState({ newLabel: event.target.value });
    }

    // add a new method to handle the click on the add label button
    handleNewLabelClick = () => {
        const { labels, newLabel } = this.state;
        // add the new label to the labels array
        this.setState({ labels: [...labels, newLabel], newLabel: '' });
        // update localStorage
        localStorage.setItem('labels', JSON.stringify([...labels, newLabel]));
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
                <div className="row">
                    <div className="col-12">
                        <h1>Admin Dashboard</h1>
                        <div className="form-group">
                            <label htmlFor="newLabel">Add a new label</label>
                            <input type="text" className="form-control" id="newLabel" value={newLabel} onChange={this.handleNewLabelChange} />
                            <button className="btn btn-primary" onClick={this.handleNewLabelClick}>Add Label</button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="labels">Labels</label>
                            <select className="form-control" id="labels">
                                {labels.map((label) => {
                                    return <option key={label}>{label}</option>
                                })}
                            </select>
                        </div>
                        {/* <button className="btn btn-primary" onClick={Navigate('/')}>Logout</button> */}
                        <button className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="row">
                    {images && images.map((image) => {
                        return (
                            <div className="col-4" key={image.id}>
                                <img src={image.url} alt={image.id} width={360} className="img-fluid" />
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}







// class AdminDashboard extends Component {
//     // check loggedIn state and set it to false on logout
//     state = {
//         logout: false
//     };

//     handleLogout = () => {
//         localStorage.removeItem('user');
//         this.setState({ logout: true });
//     };


//     render() {
//         const { logout } = this.state;
//         if (logout) {
//             return <Navigate to="/" />;
//         }
//         return (
//             <div>
//                 <h1>Admin Dashboard</h1>
//                 <button onClick={this.handleLogout}>Logout</button>
//             </div>
//         );
//     }
// }

export default AdminDashboard;