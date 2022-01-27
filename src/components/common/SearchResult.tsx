import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { SearchBar } from "../SearchBar";

interface SearchResultType {
	backdrop_path: string;
	id: number;
	poster_path: string;
	title: string;
	popularity: number;
	release_date: string;
	overview: string;
}

export default function SearchResult() {
	const { name } = useParams();
	const [serachMovie, setSearchMovie] = useState<string | any>(name);
	const [movies, setMovies] = useState<SearchResultType[]>([]);

	useEffect(() => {
		setSearchMovie(name);
		axios
			.get(`${process.env.REACT_APP_SEARCH_MOVIE}${serachMovie}`)
			.then((response) => setMovies(response.data.results))
			.catch((err) => console.log(err));
	}, [movies]);

	return (
		<>
			<SearchBar />
			<Link to={"/home"}>back</Link>

			<div className="search-movies">
				{movies.map((movie: SearchResultType) => (
					<div className="search-movies-item" key={movie.id}>
						<div className="search-movies-item-image">
							<img
								src={`${process.env.REACT_APP_MOVIES_IMG}${movie.backdrop_path}`}
								alt=""
								className="img-fluid"
							/>
						</div>
						<div className="text-wrapper">
							<div className="search-movies-item-title">
								<Link to={`/detail/${movie.id}`}>{movie.title}</Link>
							</div>
							<div className="popularity">
								<span>Popularity: {movie.popularity}</span>
								<span>Release Date: {movie.release_date}</span>
							</div>
							<div className="d-flex align-items-center my-3">
								<div className="search-movies-item-logo">
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
			</div>
		</>
	);
}
