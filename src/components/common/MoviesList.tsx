import axios from "axios";
import { useEffect, useState } from "react";

export default function MoviesList() {
	const [movies, setMovies] = useState<any[]>([]);
	useEffect(() => {
		axios
			.get(
				"https://api.themoviedb.org/3/movie/top_rated?api_key=4ce6fff0da52d2214a794776a6bba549"
			)
			.then((response) => setMovies(response.data.results))
			.catch((err) => console.log(err));
	}, []);
	useEffect(() => {
		// console.log(movies);
	}, [movies]);

	return (
		<div className="list">
			{movies.map((movie) => {
				return (
					<div className="list__item" key={movie.id}>
						<div className="list__item--image">
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
								alt=""
								className="img-fluid"
							/>
						</div>
						<div>
							<div className="list__item--logo">
								<img src="" alt="" className="img-fluid" />
							</div>
							<h3 className="list__item--title"></h3>
						</div>
					</div>
				);
			})}
		</div>
	);
}
