import { useEffect, useState } from "react";
import { NextArrow, PrevArrow } from "../../utilis/Slider";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

interface ObjectType {
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	poster_path: string;
	title: string;
	vote_count: number;
	isLike: boolean;
}

interface GenreType {
	movies: any[];
	id: number;
	name: string;
}

export default function MoviesList() {
	const [movies, setMovies] = useState<any[]>([]);
	const [genreMovie, setGenreMovie] = useState<any[]>([]);

	useEffect(() => {
		let Addlike: object = movies.map((movie) => (movie.isLike = false));
		setMovies([Addlike]);

		const movieApi = axios.get(`${process.env.REACT_APP_MOVIES_URL}`);
		const genresApi = axios.get(`${process.env.REACT_APP_GENRES_URL}`);

		axios
			.all([movieApi, genresApi])
			.then((res) => {
				setMovies(res[0].data.results);
				let filteredGenres: object[] = [];
				res[1].data.genres.map((m: GenreType) => {
					m.movies = [];
					res[0].data.results.forEach((movie: any) => {
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
	}, []);

	const handleLike = (item: object) => {
		let index = movies.indexOf(item);
		let movieEle = [...movies][index];
		movieEle.isLike = !movies[index].isLike;

		movieEle.isLike
			? (movieEle.vote_count = movies[index].vote_count + 1)
			: (movieEle.vote_count = movies[index].vote_count - 1);

		setMovies([...movies]);
	};
	return (
		<div className="list">
			<h1>All</h1>
			<Slider {...sliderSettings}>
				{movies.map((movie, i) => {
					return (
						<div className="list-item" key={movie.id}>
							<div className="list-item-image">
								<img
									src={`${process.env.REACT_APP_MOVIES_IMG}${movie.backdrop_path}`}
									alt=""
									className="img-fluid"
								/>
							</div>
							<div className="text-wrapper">
								<div className="list-item-logo">
									<img
										src={`${process.env.REACT_APP_MOVIES_IMG}${movie.poster_path}`}
										alt=""
										className="img-fluid"
									/>
								</div>
								<div className="list-item-title">
									<Link to={`detail/${movie.id}`}>{movie.title}</Link>

									<span className="d-block">
										<i
											className={`${movie.isLike ? "fas" : "far"} fa-heart`}
											onClick={() => {
												handleLike(movie);
											}}
										>
											<span className="vote">{movie.vote_count}</span>
											<span className="vote">{movie.isLike}</span>
										</i>
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</Slider>
			{genreMovie.map((movie, i) => {
				debugger;
				return (
					<div key={i}>
						<h1 className="mt-5">{movie.name}</h1>
						<Slider {...sliderSettings}>
							{movie.movies.map((item: any) => {
								return (
									<div className="list-item" key={item.id}>
										<div className="list-item-image">
											<img
												src={`${process.env.REACT_APP_MOVIES_IMG}${item.backdrop_path}`}
												alt=""
												className="img-fluid"
											/>
										</div>

										<div className="text-wrapper">
											<div className="list-item-logo">
												<img
													src={`${process.env.REACT_APP_MOVIES_IMG}${item.poster_path}`}
													alt=""
													className="img-fluid"
												/>
											</div>
											<div className="list-item-title">
												<Link to={`detail/${item.id}`}>{item.title}</Link>
												<span className="d-block">
													<i
														className={`${
															item.isLike ? "fas" : "far"
														} fa-heart`}
														onClick={() => {
															handleLike(item);
														}}
													>
														<span className="vote">{item.vote_count}</span>
														<span className="vote">{item.isLike}</span>
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

const sliderSettings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 5,
	slidesToScroll: 4,
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
