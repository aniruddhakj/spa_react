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
		const images = this.importAll(require.context('/assets/images', false, /\.(jpg)$/));
		// add the images to the images array from the src/images folder
		// set state in response to the images array
		this.setState({ images: Object.keys(images).map((image) => ({ id: image, url: images[image].default, label: null })) });
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

	// add a new method to handle the label assignment
	handleLabelAssignment = () => {
		const { selectedImage, selectedLabel, images } = this.state;
		// check if the selected image and label are not null
		if (selectedImage && selectedLabel) {
			// find the selected image in the images array
			const image = images.find((image) => image.id === selectedImage.id);
			// check if the image is not null
			if (image) {
				// check if the image already has a label
				if (image.label) {
					// check if the image has the same label as the selected label
					if (image.label.id === selectedLabel.id) {
						// remove the label from the image
						image.label = null;
					} else {
						// assign the selected label to the image
						image.label = selectedLabel;
					}
				} else {
					// assign the selected label to the image
					image.label = selectedLabel;
				}
				// update the images array
				this.setState({ images });
			}
		}
	};

	// add a new method to handle the label deletion
	handleLabelDeletion = () => {
		const { selectedImage, images } = this.state;
		// check if the selected image is not null
		if (selectedImage) {
			// find the selected image in the images array
			const image = images.find((image) => image.id === selectedImage.id);
			// check if the image is not null
			if (image) {
				// remove the label from the image
				image.label = null;
				// update the images array
				this.setState({ images });
			}
		}
	};

	// add a new method to handle the label filtering
	handleLabelFiltering = (label) => {
		const { images } = this.state;
		// check if the label is not null
		if (label) {
			// filter the images by the label
			const filteredImages = images.filter((image) => image.label && image.label.id === label.id);
			// update the filtered images array
			this.setState({ filteredImages });
		} else {
			// update the filtered images array
			this.setState({ filteredImages: [] });
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
		// give user the option to filter the images by labels
		// give user the option to assign, reassign and delete a label on an image
		// give user the option to logout
		return (
			<>
				{this.state.logout && <Navigate to="/" />}
				<div className="dashboard">
					<div className="dashboard-header">
						<div className="dashboard-header__title">Dashboard</div>
						<button className="dashboard-header__logout" onClick={this.handleLogout}>
							Logout
						</button>
					</div>
					<div className="dashboard-content">
						<div className="dashboard-content__images">{this.displayImages()}</div>
						<div className="dashboard-content__labels">
							<div className="dashboard-content__labels-header">
								<div className="dashboard-content__labels-header-title">Labels</div>
								<button className="dashboard-content__labels-header-add">Add</button>
							</div>
							<div className="dashboard-content__labels-list">
								<div
									className="dashboard-content__labels-list-item"
									onClick={() => this.handleLabelFiltering(null)}
								>
									All
								</div>
								<div
									className="dashboard-content__labels-list-item"
									onClick={() => this.handleLabelFiltering({ id: 1, name: 'Label 1' })}
								>
									Label 1
								</div>
								<div
									className="dashboard-content__labels-list-item"
									onClick={() => this.handleLabelFiltering({ id: 2, name: 'Label 2' })}
								>
									Label 2
								</div>
								<div
									className="dashboard-content__labels-list-item"
									onClick={() => this.handleLabelFiltering({ id: 3, name: 'Label 3' })}
								>
									Label 3
								</div>
							</div>
						</div>
					</div>
				</div>
				{this.state.selectedImage && (
					<div className="image-modal">
						<div className="image-modal__content">
							<div className="image-modal__content-header">
								<div className="image-modal__content-header-title">Image</div>
								<button
									className="image-modal__content-header-close"
									onClick={() => this.setState({ selectedImage: null })}
								>
									X
								</button>
							</div>
							<div className="image-modal__content-body">
								<img src={this.state.selectedImage.url} alt={this.state.selectedImage.name || 'No Name'} />
								<div className="image-modal__content-body-label">
									{this.state.selectedImage.label ? this.state.selectedImage.label.name : 'No Label'}
								</div>
							</div>
							<div className="image-modal__content-footer">
								<button
									className="image-modal__content-footer-assign"
									onClick={() => this.handleLabelAssignment()}
								>
									{this.state.selectedImage.label ? 'Reassign' : 'Assign'}
								</button>
								<button
									className="image-modal__content-footer-delete"
									onClick={() => this.handleLabelDeletion()}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				)}
			</>
		);
	}

}

export default UserDashboard;