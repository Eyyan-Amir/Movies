import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { SearchInput } from "../SearchInput";

interface SearchMovieProps {
	backdrop_path: string;
	id: number;
	poster_path: string;
	title: string;
	popularity: number;
	release_date: string;
	overview: string;
}
export default function MovieSearch() {
	const params = useParams();
	const paramsName = params.name;
	const [serachMovie, setSearchMovie] = useState<string | any>(paramsName);
	const [movies, setMovies] = useState<SearchMovieProps[]>([]);
	useEffect(() => {
		setSearchMovie(paramsName);
		axios
			.get(`${process.env.REACT_APP_SEARCH_MOVIE}${serachMovie}`)
			.then((response) => setMovies(response.data.results))
			.catch((err) => console.log(err));
	}, [movies]);
	return (
		<>
			<SearchInput />

			<div className="searchMovies">
				{movies.map((movie: SearchMovieProps) => (
					<div className="searchMovies-item" key={movie.id}>
						<div className="searchMovies-item-image">
							<img
								src={`${process.env.REACT_APP_MOVIES_IMG}${movie.backdrop_path}`}
								alt=""
								className="img-fluid"
							/>
						</div>
						<div className="text-wrapper">
							<div className="searchMovies-item-title">
								<Link to={`/detail/${movie.id}`}>{movie.title}</Link>
							</div>
							<div className="popularity">
								<span>Popularity: {movie.popularity}</span>
								<span>Release Date: {movie.release_date}</span>
							</div>
							<div className="d-flex align-items-center my-3">
								<div className="searchMovies-item-logo">
									<img
										src={`${process.env.REACT_APP_MOVIES_IMG}${movie.poster_path}`}
										alt=""
										className="img-fluid"
									/>
								</div>
								<span>{movie.title}</span>
							</div>
							<span>{movie.overview}</span>
						</div>
					</div>
				))}
				<Link to={"/home"}>back</Link>
			</div>
		</>
	);
}
