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
		selectedImages: [],
		// add a new state to store the selected label
		selectedLabel: null,
		// add a new state to store the labels
		labels: [],
		// add a new state to store the filtered images
		filteredImages: [],
		isHidden: false
	};

	// add a new method to import all the images from the src/images folder
	importAll(r) {
		let images = {};
		r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
		// show the images in the console
		return images
	}

	componentDidMount() {
		const images = this.importAll(require.context('../../src/images', false, /\.(jpg)$/));
		// add the images to the images array from the src/images folder
		// set state in response to the images array
		this.setState({
			images: Object.keys(images).map((image) => {
				return { id: image, url: images[image], label: null };
			})
		})
		// get the labels from current session
		this.setState({ labels: JSON.parse(sessionStorage.getItem('labels')) });
	}


	// add a method to display all the images on the dashboard page (default dashboard page)
	displayImages = () => {
		// get the images from the state
		const { images } = this.state;
		// check if the images array is not empty
		if (images.length > 0) {
			// display the images in the images array
			return images.map((image) => {
				return (
					<div key={image.id} className="col-3">
						<div className="card">
							<img src={image.url} className="card-img-top" alt={image.id} width={200} />
							<input type="checkbox" className="form-check-input" onChange={() => this.handleImageSelection(image)} />
						</div>
					</div>
				);
			});
		}
	};

	// add a method to handle the image selection
	handleImageSelection = (image) => {
		// get the selected images from the state
		const { selectedImages } = this.state;
		// check if the selected images array includes the selected image
		if (selectedImages.includes(image.id)) {
			// remove the selected image from the selected images array
			this.setState({ selectedImages: selectedImages.filter((selectedImage) => selectedImage !== image.id) });
		} else {
			// add the selected image to the selected images array
			this.setState({ selectedImages: [...selectedImages, image.id] });
		}
	};


	// add a method to display the all the labels in the labels array
	displayLabels = () => {
		// get the labels from the localStorage
		const labels = JSON.parse(sessionStorage.getItem('labels'));
		// check if the labels array is not empty
		if (labels.length > 0) {
			// display the labels in the labels array
			return labels.map((label) => {
				return (
					<option key={label}>{label}</option>
				);
			});
		}
	};




	// add a method to handle the label assignment based on the selected image
	handleLabelAssignment = () => {
		// get the selected label from the state
		const { selectedLabel } = this.state;
		// get the selected images from the state
		const { selectedImages } = this.state;

		if(selectedLabel === null || selectedImages.length === 0) {
			alert('Please select both a label and an image');
			console.log(this.state.images);
			return;
		}
		// apply the selected label to the selected images
		// set state in response to the images array
		this.setState({
			images: this.state.images.map((image) => {
				if (selectedImages.includes(image.id)) {
					image.label = selectedLabel;
				}
				return image;
			})
		});
		// clear the selected images
		this.setState({ selectedImages: [] });
		console.log(this.state.images);
	};



	// add a method to handle the label deletion from an image
	handleLabelDeletion = () => {
		// get the selected images from the state
		const { selectedImages } = this.state;

		if(selectedImages.length === 0) {
			alert('Please select an image');
			console.log(this.state.images);
			return;
		}
		// remove the label from the selected images
		// set state in response to the images array
		this.setState({
			images: this.state.images.map((image) => {
				if (selectedImages.includes(image.id)) {
					image.label = null;
				}
				return image;
			})
		});
		console.log(this.state.images);
	};

	// add a method to display the filtered images
	handleFilterImages = (event) => {
		// get the selected label from the state
		const { selectedLabel } = this.state;
		// get the images from the state
		const { images } = this.state;
		// filter the images based on the selected label
		const filteredImages = images.filter((image) => image.label === selectedLabel);
		console.log(filteredImages);
		// toggle the isHidden state
		this.setState({ isHidden: !this.state.isHidden });
		// change the button text based on the isHidden state
		if (!this.state.isHidden) {
			event.target.innerHTML = 'Show All Images';
		} else {
			event.target.innerHTML = 'Show Filtered Images';
		}
			// display the images in the images array
		return filteredImages.map((image) => {
			return (
				<div key={image.id} className="col-3">
					<div className="card">
						<img src={image.url} className="card-img-top" alt={image.id} width={200} />
					</div>
				</div>
			);
		});
	};



	// add a method to handle the label selection
	handleLabelSelection = (event) => {
		// get the selected label from the event
		const selectedLabel = event.target.value;
		// set state in response to the selected label
		this.setState({ selectedLabel });
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
		/*
		Next to the select label option add button to display filtered images by label
		*/
		return (
			<div className="user-dashboard">
				<div className="user-dashboard-header">
					<div className="user-dashboard-header-title">User Dashboard</div>
					<div className="user-dashboard-header-logout">
						<button onClick={this.handleLogout}>Logout</button>
					</div>
				</div>
				<div className="user-dashboard-body">
					<div className="select-label">
						<select onChange={this.handleLabelSelection}>
							<option value="">Show all Images</option>
							{this.displayLabels()}
						</select>
						<button onClick={this.handleLabelAssignment}>Assign/Reassign Label</button>
						<button onClick={this.handleLabelDeletion}>Delete Label</button>
						<button onClick={this.handleFilterImages}>View</button>

					</div>
					{!this.state.isHidden ? this.displayImages() : this.state.images.filter((image) => image.label === this.state.selectedLabel).map((image) => {
						return (
							<div key={image.id} className="col-3">
								<div className="card">
									<img src={image.url} className="card-img-top" alt={image.id} width={200} />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default UserDashboard;