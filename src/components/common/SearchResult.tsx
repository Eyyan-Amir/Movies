import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { fetchSearchMovie } from "../../redux/action/action";

interface SearchResultType {
	backdrop_path: string;
	id: number;
	poster_path: string;
	title: string;
	popularity: number;
	release_date: string;
	overview: string;
}

function SearchResult({ items }: any) {
	const { name } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSearchMovie(name));
	}, [name]);

	return (
		<>
			<SearchBar />
			<Link to={"/home"}>back</Link>

			<div className="search-movies">
				{items.searchResult.length ? (
					items.searchResult.map((movie: SearchResultType) => (
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
					))
				) : (
					<h2 className="text-center">
						I tried so hard and got so far but in the end{" "}
						<h1>Movie not found :(</h1>
					</h2>
				)}
			</div>
		</>
	);
}

const mapStateToProps = (state: any) => {
	return {
		items: state.movie,
	};
};

export default connect(mapStateToProps)(SearchResult);
