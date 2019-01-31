import React from 'react';
import { Consumer } from '../../context';
import AirCraftItem from './AirCraftItem';

const AirCraftList = () => {
	return (
		<Consumer>
			{({ currentList }) => (
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Logo</th>
							<th>Country</th>
							<th>Company</th>
							<th>From</th>
							<th>To</th>
						</tr>
					</thead>
					<tbody>
						{currentList.map(data => {
							return <AirCraftItem data={data} key={data.Id} />;
						})}
					</tbody>
				</table>
			)}
		</Consumer>
	);
};

export default AirCraftList;
