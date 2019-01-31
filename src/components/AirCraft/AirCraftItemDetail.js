import React, { Component } from 'react';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';
import placeholder from '../../assets/placeholder.png';

class AirCraftItemDetail extends Component {
	componentDidMount() {}

	errorHandler = e => {
		e.target.src = placeholder;
	};
	render() {
		return (
			<Consumer>
				{({ activeItem }) => (
					<div className="container">
						<Link to="/">Back</Link>
						<div className="card-panel hoverable center-align">
							<img
								alt=""
								src={`//logo.clearbit.com/${
									activeItem.Op === undefined
										? null
										: activeItem.Op.toLowerCase().replace(/\s/g, '')
								}.com`}
								onError={e => (e.target.src = placeholder)}
							/>
							<div>Id: {activeItem.Id}</div>
							<div>Company: {activeItem.Op}</div>
							<div>Latitude: {activeItem.Lat}</div>
							<div>Longitude: {activeItem.Long}</div>
							<div>From: {activeItem.From}</div>
							<div> To:{activeItem.To} </div>
						</div>
					</div>
				)}
			</Consumer>
		);
	}
}
export default AirCraftItemDetail;
