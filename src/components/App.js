import React from 'react';
import { Consumer } from '../context';
import Pagination from 'react-js-pagination';

// components import
import AirCraftList from './AirCraft/AirCraftList';
import Loader from './Loader';
import UserLocation from './UserLocation';

const App = () => {
	return (
		<Consumer>
			{state => (
				<div className="container">
					<button onClick={state.getUserLocation} className="btn">
						Get Data
					</button>
					{state.error ? (
						<div>{state.error}</div>
					) : (
						<>
							{state.loading && <Loader />}
							{state.airCraftList.length > 0 && !state.loading ? (
								<>
									<UserLocation
										latitude={state.location.latitude}
										longitude={state.location.longitude}
									/>
									<Pagination
										activePage={state.activePage}
										itemsCountPerPage={state.limit}
										totalItemsCount={state.airCraftList.length}
										pageRangeDisplayed={5}
										onChange={state.handlePageChange}
									/>

									<AirCraftList />

									<Pagination
										activePage={state.activePage}
										itemsCountPerPage={state.limit}
										totalItemsCount={state.airCraftList.length}
										pageRangeDisplayed={5}
										onChange={state.handlePageChange}
									/>
								</>
							) : null}
						</>
					)}
				</div>
			)}
		</Consumer>
	);
};

export default App;
