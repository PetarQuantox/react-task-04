import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context';
import placeholder from '../../assets/placeholder.png';

const AirCraftItem = props => {
	const errorHandler = e => {
		e.target.src = placeholder;
	};
	return (
		<Consumer>
			{({ getAircraftById }) => (
				<tr className="aircraft-item">
					<td>{props.data.Id}</td>
					<td className="logo--sm">
						<img
							alt=""
							className="aircraft-image"
							src={`//logo.clearbit.com/${
								props.data.Op === undefined
									? null
									: props.data.Op.toLowerCase().replace(/\s/g, '')
							}.com`}
							onError={errorHandler}
						/>
					</td>
					<td>{props.data.Cou}</td>
					<td>{props.data.Op || 'Unknown'}</td>
					<td>{props.data.From || 'Unknown'}</td>
					<td>{props.data.To || 'Unknown'}</td>

					<td>
						<Link
							to={`/aircraft-details/${props.data.Id}`}
							onClick={() => getAircraftById(props.data.Id)}>
							<i className="far fa-arrow-alt-circle-right" />
						</Link>
					</td>
				</tr>
			)}
		</Consumer>
	);
};

export default AirCraftItem;
