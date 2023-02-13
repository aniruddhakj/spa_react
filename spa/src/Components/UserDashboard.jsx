/* SPA dashboard has following requirements:
    1. Sort the 12 images by category, user can assign, reassign and delete a label on an image.
    2. User shall be able to view images filtered by labels. Images can be found in the src/images folder.
    3. Logout button shall be available on the dashboard.
*/

import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

// global variable to store the images

class UserDashboard extends Component {
	// check loggedIn state and set it to false on logout
	state = {
		logout: false,
		// images array will be populated with the images from src/images folder
		images: [],
		// add a new state to store the selected image
		selectedImage: null,
		// add a new state to store the selected label
		selectedLabel: null,
		// add a new state to store the labels
		labels: [],
		// add a new state to store the filtered images
		filteredImages: []
	};

	// add a new method to import all the images from the src/images folder
	importAll(r) {
		let images = {};
		r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
		// show the images in the console
		return images
	}
	// add the images to the images array from the src/images folder
	// there is no label assigned to the images when the page loads
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


	// add a method to display all the images on the dashboard page (default dashboard page)
	displayImages = () => {
		// get the images from the state
		const { images } = this.state;
		// check if the images array is not empty

		if (images.length > 0) {
			// display the images on the dashboard page
			// fix the image size to 200px
			return images.map((image) => {
				return (
					<div className="image" key={image.id}>
						<img src={image.url} alt={image.id} width="200" />
					</div>
				);
			});
		}
	};


	// add a new method to handle the image selection
	handleImageSelection = (image) => {
		this.setState({ selectedImage: image });
	};

	// add a new method to handle the label selection
	handleLabelSelection = (label) => {
		this.setState({ selectedLabel: label });
	};

	// add a new method to handle the label addition
	// if the label is not already present in the labels array, add it to the labels array
	handleLabelAddition = (label) => {
		const { labels } = this.state;
		if (labels.indexOf(label) === -1) {
			this.setState({ labels: [...labels, label] });
		}
	};

	// add a new method to handle the label deletion
	// if the label is present in the labels array, delete it from the labels array
	// remove the label from all the images

	handleLabelDeletion = (label) => {
		const { labels, images } = this.state;
		if (labels.indexOf(label) !== -1) {
			this.setState({ labels: labels.filter((l) => l !== label) });
			this.setState({ images: images.map((image) => ({ ...image, label: image.label === label ? null : image.label })) });
		}
	};

	// add a new method to handle the label assignment
	// if the label is present in the labels array, assign it to the selected image
	handleLabelAssignment = (label) => {
		const { labels, images, selectedImage } = this.state;
		if (labels.indexOf(label) !== -1) {
			this.setState({ images: images.map((image) => ({ ...image, label: image.id === selectedImage.id ? label : image.label })) });
		}
	};

	// add a new method to handle the label reassignment
	// if the label is present in the labels array, reassign it to the selected image
	handleLabelReassignment = (label) => {
		const { labels, images, selectedImage } = this.state;
		if (labels.indexOf(label) !== -1) {
			this.setState({ images: images.map((image) => ({ ...image, label: image.id === selectedImage.id ? label : image.label })) });
		}
	};


	handleLogout = () => {
		localStorage.removeItem('user');
		this.setState({ logout: true });
	};

	render() {
		// check if the user is logged in
		if (!localStorage.getItem('user')) {
			return <Navigate to="/" />;
		}
		// display the dashboard page with all the images and labels below each image by default (no label filtering)
		// give user the option to filter the images by labels present in the labels array
		// give user the option to assign, reassign and delete a label on an image
		// give user the option to logout
		return (
			<div className="dashboard">
				<div className="images">{this.displayImages()}</div>
				<div className="labels">
					{this.state.labels.map((label) => {
						return (
							<div className="label" key={label}>
								{label}
								<button onClick={() => this.handleLabelAssignment(label)}>Assign</button>
								<button onClick={() => this.handleLabelReassignment(label)}>Reassign</button>
								<button onClick={() => this.handleLabelDeletion(label)}>Delete</button>
							</div>
						);
					})}
				</div>
				<button onClick={this.handleLogout}>Logout</button>
			</div>
		);
	}
}

export default UserDashboard;