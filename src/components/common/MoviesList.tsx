import { useEffect, useState } from "react";
import { NextArrow, PrevArrow } from "../../utilis/Slider";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
// import { ApiCall } from "./ApiCall";

interface moviesType {
	backdrop_path: string;
	genre_ids: [number, number, number];
	id: number;
	poster_path: string;
	title: string;
	vote_count: number;
	isLikebtn: boolean;
}

interface genreType {
	id: number;
	name: string;
}

export default function MoviesList() {
	const [movies, setMovies] = useState<any[]>([]);
	const [genreMovie, setGenreMovie] = useState<genreType[]>([]);
	useEffect(() => {
		setMovies([
			movies.map((movie, i) => {
				return (movie.isLikebtn = false);
			}),
		]);
		axios
			.get(`${process.env.REACT_APP_MOVIES_URL}`)
			.then((response) => {
				setMovies(response.data.results);
			})
			.catch((err) => console.log(err));

		axios
			.get(
				`https://api.themoviedb.org/3/genre/list?api_key=4ce6fff0da52d2214a794776a6bba549`
			)
			.then((response) => {
				setGenreMovie(response.data.genres);
			})
			.catch((err) => console.log(err));
	}, []);
	const handleLike = (item: object) => {
		let newMovie = [...movies];
		let index = newMovie.indexOf(item);
		newMovie[index].isLikebtn = !movies[index].isLikebtn;

		newMovie[index].isLikebtn
			? (newMovie[index].vote_count = movies[index].vote_count + 1)
			: (newMovie[index].vote_count = movies[index].vote_count - 1);

		setMovies(newMovie);
	};
	return (
		<div className="list">
			<h1>All</h1>
			<Slider {...settings}>
				{movies.map((movie, i) => {
					return (
						<div className="list__item" key={movie.id}>
							<div className="list__item--image">
								<img
									src={`${process.env.REACT_APP_MOVIES_IMG}${movie.backdrop_path}`}
									alt=""
									className="img-fluid"
								/>
							</div>
							<div className="text-wrapper">
								<div className="list__item--logo">
									<img
										src={`${process.env.REACT_APP_MOVIES_IMG}${movie.poster_path}`}
										alt=""
										className="img-fluid"
									/>
								</div>
								<div className="list__item--title">
									<Link to={`detail/${movie.id}`}>{movie.title}</Link>

									<span className="d-block">
										<i
											className={`${movie.isLikebtn ? "fas" : "far"} fa-heart`}
											onClick={() => {
												handleLike(movie);
											}}
										>
											<span className="vote">{movie.vote_count}</span>
											<span className="vote">{movie.isLikebtn}</span>
										</i>
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</Slider>
			{genreMovie.map((movie, i) => {
				return (
					<div key={i}>
						<h1 className="mt-5">{movie.name}</h1>
						<Slider {...settings}>
							{movies.map((movie) => {
								return (
									<div className="list__item" key={movie.id}>
										<div className="list__item--image">
											<img
												src={`${process.env.REACT_APP_MOVIES_IMG}${movie.backdrop_path}`}
												alt=""
												className="img-fluid"
											/>
										</div>
										<div className="text-wrapper">
											<div className="list__item--logo">
												<img
													src={`${process.env.REACT_APP_MOVIES_IMG}${movie.poster_path}`}
													alt=""
													className="img-fluid"
												/>
											</div>
											<div className="list__item--title">
												<Link to={`detail/${movie.id}`}>{movie.title}</Link>
												<span>
													<i
														className={`${
															movie.isLikebtn ? "fas" : "far"
														} fa-heart`}
														onClick={() => {
															handleLike(movie);
														}}
													>
														<span className="vote">{movie.vote_count}</span>
														<span className="vote">{movie.isLikebtn}</span>
													</i>
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</Slider>
					</div>
				);
			})}
		</div>
	);
}

const settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 5,
	slidesToScroll: 3,
	spaceBetween: 20,
	nextArrow: (
		<NextArrow
			className="slick-arrow slick-next slick-disabled"
			style={{ display: "block", right: "0px" }}
		/>
	),
	prevArrow: (
		<PrevArrow
			className="slick-prev slick-next slick-disabled"
			style={{ display: "block", left: "0px", zIndex: 1 }}
		/>
	),
};
