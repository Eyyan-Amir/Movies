import { useEffect } from "react";
import { PrevArrow } from "../../components/slider/PrevArrow";
import { NextArrow } from "../../components/slider/NextArrow";
import axios from "axios";
import MoviesSlider from "./MoviesSlider";
import GenresSlider from "./GenresSlider";
import { useSelector, useDispatch } from "react-redux";
import { setMovies, setGenre } from "../../action/action";

interface MovieType {
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	poster_path: string;
	title: string;
	vote_count: number;
	isLiked: boolean;
}

interface GenreType {
	movies: object[];
	id: number;
	name: string;
}

export default function MoviesList() {
	//@ts-ignore
	const { movies = [], genreMovies = [] } = useSelector(
		//@ts-ignore
		(state) => state.moviesReducer
	);
	const dispatch = useDispatch();

	const filterMoviesIntoGenres = (movieApi: any, genresApi: any) => {
		axios
			.all([movieApi, genresApi])
			.then((res) => {
				dispatch(setMovies(res[0].data.results));
				let filteredGenres: GenreType[] = [];
				res[1].data.genres.map((m: GenreType) => {
					m.movies = [];
					res[0].data.results.forEach((movie: MovieType) => {
						if (movie.genre_ids.includes(m.id)) {
							m.movies.push(movie);
						}
					});
					filteredGenres.push(m);
				});
				dispatch(setGenre(filteredGenres));
			})
			.catch((errors) => {
				console.error(errors);
			});
	};

	const callMovieApi = () => {
		const movieApi = axios.get(`${process.env.REACT_APP_MOVIES_URL}`);
		const genresApi = axios.get(`${process.env.REACT_APP_GENRES_URL}`);

		filterMoviesIntoGenres(movieApi, genresApi);
	};

	const handleLikeClick = (item: MovieType) => {
		let index = movies.indexOf(item);
		let movie = movies[index];
		movie.isLiked = !movie.isLiked;

		movie.isLiked
			? (movie.vote_count = movie.vote_count + 1)
			: (movie.vote_count = movie.vote_count - 1);

		movies.splice(index, 1, movie);

		dispatch(setMovies([...movies]));
	};

	useEffect(() => {
		callMovieApi();
	}, []);

	return (
		<>
			<div className="list">
				<h1>All</h1>
				<MoviesSlider
					sliderSettings={{ ...sliderSettings }}
					movies={movies}
					handleLikeClick={handleLikeClick}
				/>

				<GenresSlider
					sliderSettings={{ ...sliderSettings }}
					movies={genreMovies}
					handleLikeClick={handleLikeClick}
				/>
			</div>
		</>
	);
}

const sliderSettings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 5,
	slidesToScroll: 5,
	nextArrow: <NextArrow className="slick-arrow slick-next slick-disabled" />,
	prevArrow: <PrevArrow className="slick-prev slick-next slick-disabled" />,
};
