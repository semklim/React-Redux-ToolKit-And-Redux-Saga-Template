import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFilms } from './feature/filmeSlice/filmeSlice';

getFilms;

function App() {
	const films = useSelector((state) => state.films.films);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFilms({ value: 'Harry' }));
	}, [dispatch]);

	// console.log(films);
	return (
		<>
			<h1>FILMS</h1>
			{films.map((el) => (
				<div className='films' key={el.imdbID}>
					{el.Title}
				</div>
			))}
		</>
	);
}

export default App;
