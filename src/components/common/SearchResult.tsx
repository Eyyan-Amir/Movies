import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { setSearchMovies } from "../../action/action";

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
	const { searchMovies } = useSelector(
		(state) =>
			//@ts-ignore
			state.moviesReducer
	);

	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_SEARCH_MOVIE}${name}`)
			.then((response) => dispatch(setSearchMovies(response.data.results)))
			.catch((err) => console.log(err));
	}, [name]);

	return (
		<>
			<SearchBar />
			<Link to={"/home"}>back</Link>

			<div className="search-movies">
				{searchMovies.map((movie: SearchResultType) => (
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
