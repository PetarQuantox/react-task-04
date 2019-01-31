import React from 'react';
import { Consumer } from '../context';
import Pagination from 'react-js-pagination';

// components import
import AirCraftList from './AirCraft/AirCraftList';
import Loader from './Loader';

const App = () => {
	return (
		<Consumer>
			{state => (
				<div className="container">
					<button
						onClick={state.getUserLocation}
						className=""
						style={{ margin: '2rem' }}>
						Get Data
					</button>
					{state.error ? (
						<div>{state.error}</div>
					) : (
						<>
							{state.loading && <Loader />}
							{state.airCraftList.length > 0 && !state.loading ? (
								<>
									<div className="right-align">
										You current position is:{' '}
										<strong>{state.location.latitude}</strong> -{' '}
										<strong>{state.location.longitude}</strong>
									</div>
									<div className="col-12 center-align">
										<Pagination
											activePage={state.activePage}
											itemsCountPerPage={state.limit}
											totalItemsCount={state.airCraftList.length}
											pageRangeDisplayed={5}
											onChange={state.handlePageChange}
										/>
									</div>

									<AirCraftList />
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
