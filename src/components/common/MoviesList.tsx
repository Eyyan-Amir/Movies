import React from "react";
import { useEffect } from "react";
import { PrevArrow } from "../../components/slider/PrevArrow";
import { NextArrow } from "../../components/slider/NextArrow";
import MoviesSlider from "./MoviesSlider";
import GenresSlider from "./GenresSlider";
import { useSelector, useDispatch } from "react-redux";
import {
	getMovies,
	getGenresMovies,
	toggleIsLiked,
} from "../../redux/reducer/reducer";

interface MovieType {
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	poster_path: string;
	title: string;
	vote_count: number;
	isLiked: boolean;
}

function MoviesList() {
	const dispatch = useDispatch();

	const { movies, genreMovies } = useSelector(
		(state) =>
			//@ts-ignore
			state.moviesReducer
	);

	const handleLikeClick = (item: MovieType) => {
		let newMovies = [...movies];
		let index = movies.indexOf(item);
		let movie = [...movies][index];

		movie.isLiked = !movie.isLiked;
		movie.isLiked = !movie.isLiked;
		console.log(movie.isLiked);

		dispatch(toggleIsLiked(movie));

		movie.isLiked
			? (movie.vote_count = movie.vote_count + 1)
			: (movie.vote_count = movie.vote_count - 1);

		movies.splice(index, 1, movie);
	};

	useEffect(() => {
		dispatch(getMovies());
	}, []);

	useEffect(() => {
		dispatch(getGenresMovies({ movies }));
	}, [movies]);

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

export default MoviesList;
