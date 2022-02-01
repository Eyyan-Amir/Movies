import { useEffect } from "react";
import { PrevArrow } from "../../components/slider/PrevArrow";
import { NextArrow } from "../../components/slider/NextArrow";
import axios from "axios";
import MoviesSlider from "./MoviesSlider";
import GenresSlider from "./GenresSlider";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { fetchMovies, fetchGenresMovies } from "../../redux/action/action";

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

function MoviesList({ items }: any) {
	//@ts-ignore
	const { movies } = useSelector(
		//@ts-ignore
		(state) => state.movie
	);
	const dispatch = useDispatch();

	const handleLikeClick = (item: MovieType) => {
		let index = movies.indexOf(item);
		let movie = movies[index];
		movie.isLiked = !movie.isLiked;

		movie.isLiked
			? (movie.vote_count = movie.vote_count + 1)
			: (movie.vote_count = movie.vote_count - 1);

		movies.splice(index, 1, movie);
	};

	useEffect(() => {
		dispatch(fetchMovies());
	}, []);

	useEffect(() => {
		dispatch(fetchGenresMovies(movies));
	}, [items]);

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
					movies={items.genreMovies}
					handleLikeClick={handleLikeClick}
				/>
			</div>
		</>
	);
}

const mapStateToProps = (state: any) => {
	return {
		items: state.movie,
	};
};

export default connect(mapStateToProps)(MoviesList);

const sliderSettings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 5,
	slidesToScroll: 5,
	nextArrow: <NextArrow className="slick-arrow slick-next slick-disabled" />,
	prevArrow: <PrevArrow className="slick-prev slick-next slick-disabled" />,
};
