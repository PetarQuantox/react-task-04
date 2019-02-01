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
						<Link to="/">
							<span className="link">
								<i className="far fa-arrow-alt-circle-left" /> Back to list
							</span>
						</Link>
						<div className="aircraft-item-details ">
							<img
								alt="Logo"
								src={`//logo.clearbit.com/${
									activeItem.Op === undefined
										? null
										: activeItem.Op.toLowerCase().replace(/\s/g, '')
								}.com`}
								onError={e => (e.target.src = placeholder)}
							/>
							<div className="detail">
								<span className="detail__coulm">Id</span>
								<span className="detail__value">{activeItem.Id}</span>
							</div>
							<div className="detail">
								<span className="detail__coulm">Company</span>
								<span className="detail__value">{activeItem.Op}</span>
							</div>
							<div className="detail">
								<span className="detail__coulm">Latitude</span>
								<span className="detail__value">{activeItem.Lat}</span>
							</div>
							<div className="detail">
								<span className="detail__coulm">Longitude</span>
								<span className="detail__value"> {activeItem.Long}</span>
							</div>
							<div className="detail">
								<span className="detail__coulm">From</span>
								<span className="detail__value">
									{activeItem.From || 'Unknown'}
								</span>
							</div>
							<div className="detail">
								<span className="detail__coulm">To</span>
								<span className="detail__value">
									{activeItem.To || 'Unknown'}
								</span>
							</div>
						</div>
					</div>
				)}
			</Consumer>
		);
	}
}
export default AirCraftItemDetail;
