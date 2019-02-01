import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { Provider } from './context';

import App from './components/App';
import AirCraftItemDetail from './components/AirCraft/AirCraftItemDetail';

const api_url = `https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=`;

class AppRouter extends Component {
	state = {
		airCraftList: [],
		currentList: [],
		location: {
			latitude: '',
			longitude: ''
		},
		error: '',
		loading: false,
		limit: 10,
		activePage: 1,
		activeItem: null
	};

	// get user location
	getUserLocation = () => {
		navigator.geolocation.getCurrentPosition(position => {
			console.log(position);
			this.showPosition(position);
			this.getAirCrafts();
		}, this.showError);
	};

	// show user position
	showPosition = position => {
		this.setState({
			location: {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}
		});
	};

	// check if geolocation is available
	showError = err => {
		switch (err.code) {
			case err.PERMISSION_DENIED:
				this.setState({
					error: 'User denied the request for Geolocation.'
				});
				break;
			case err.POSITION_UNAVAILABLE:
				this.setState({
					error: 'Location information is unavailable.'
				});
				break;
			case err.TIMEOUT:
				this.setState({
					error: 'The request to get user location timed out.'
				});
				break;
			case err.UNKNOWN_ERROR:
				this.setState({
					error: 'An unknown error occurred.'
				});
				break;
			default:
				this.setState({
					error: 'Your browser does not support location'
				});
		}
	};

	getAirCrafts = () => {
		const { latitude, longitude } = this.state.location;

		this.setState({ loading: true });

		axios
			.get(
				`https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${latitude}&lng=${longitude}&fDstL=0&fDstU=1000`
			)
			.then(res => res.data)
			.then(({ acList }) => {
				const { activePage, limit } = this.state;

				this.setState(
					{
						airCraftList: acList,
						currentList: acList.slice(
							activePage * limit - limit,
							activePage * limit
						),
						loading: false
					},
					() => setInterval(this.refreshList, 20000)
				);
			})
			.catch(() => this.setState({ error: 'Error getting data from server!' }));
	};

	refreshList = () => {
		const { latitude, longitude } = this.state.location;
		const { activePage, limit } = this.state;

		axios
			.get(`${api_url}${latitude}&lng=${longitude}&fDstL=0&fDstU=1000`)
			.then(res => {
				const airCraftList = res.data.acList;

				this.setState({
					airCraftList,
					currentList: airCraftList.slice(
						activePage * limit - limit,
						activePage * limit
					)
				});
			});
	};

	renderList = () => {
		const { limit, activePage, airCraftList } = this.state;

		this.setState({
			currentList: airCraftList.slice(
				activePage * limit - limit,
				activePage * limit
			)
		});
	};

	handlePageChange = pageNumber => {
		this.setState({ activePage: pageNumber }, () => this.renderList());
	};

	getAircraftById = id => {
		let obj = this.state.currentList.find(elem => elem.Id === +id);

		this.setState({ activeItem: obj });
	};

	getContext = () => ({
		...this.state,
		getUserLocation: this.getUserLocation,
		showPosition: this.showPosition,
		getAirCrafts: this.getAirCrafts,
		showError: this.showError,
		renderList: this.renderList,
		refreshList: this.refreshList,
		handlePageChange: this.handlePageChange,
		getAircraftById: this.getAircraftById
	});

	render() {
		return (
			<Provider value={this.getContext()}>
				<Router>
					<Switch>
						<Route path="/" exact component={App} />
						<Route
							path="/aircraft-details/:id"
							component={AirCraftItemDetail}
						/>
					</Switch>
				</Router>
			</Provider>
		);
	}
}
export default AppRouter;
