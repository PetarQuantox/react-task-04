import React from 'react';

const UserLocation = props => {
	return (
		<div className="user-location">
			You current position is: <span>{props.latitude}</span> -
			<span>{props.longitude}</span>
		</div>
	);
};

export default UserLocation;
