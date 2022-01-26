import { useEffect, useState } from "react";
import { PrevArrow } from "../../components/slider/PrevArrow";
import { NextArrow } from "../../components/slider/NextArrow";
import axios from "axios";
import MoviesSlider from "./MoviesSlider";
import GenresSlider from "./GenresSlider";
import { Formik, Form, Field } from "formik";

interface MovieType {
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	poster_path: string;
	title: string;
	vote_count: number;
	isLike: boolean;
}

interface GenreType {
	movies: object[];
	id: number;
	name: string;
}

interface SearchMovieType {
	title: string;
}

type searchtype = {
	search: string;
};
export default function MoviesList() {
	const [movies, setMovies] = useState<MovieType[]>([]);
	const [genreMovie, setGenreMovie] = useState<GenreType[]>([]);

	const initialValue = { search: "" };

	const addLikeBtn = () => {
		let Addlike: any = movies.map((movie) => (movie.isLike = false));
		setMovies([Addlike]);
	};

	const callMovieApi = () => {
		const movieApi = axios.get(`${process.env.REACT_APP_MOVIES_URL}`);
		const genresApi = axios.get(`${process.env.REACT_APP_GENRES_URL}`);

		axios
			.all([movieApi, genresApi])
			.then((res) => {
				setMovies(res[0].data.results);
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
				setGenreMovie(filteredGenres);
			})
			.catch((errors) => {
				console.error(errors);
			});
	};

	const handleLike = (item: MovieType) => {
		let index = movies.indexOf(item);
		let movie = [...movies][index];
		movie.isLike = !movies[index].isLike;

		movie.isLike
			? (movie.vote_count = movies[index].vote_count + 1)
			: (movie.vote_count = movies[index].vote_count - 1);

		setMovies([...movies]);
	};

	useEffect(() => {
		addLikeBtn();
		callMovieApi();
	}, []);

	return (
		<>
			<div className="list">
				<h1>All</h1>
				<MoviesSlider
					sliderSettings={{ ...sliderSettings }}
					movies={movies}
					handleLike={handleLike}
				/>

				<GenresSlider
					sliderSettings={{ ...sliderSettings }}
					movies={genreMovie}
					handleLike={handleLike}
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
