import { useEffect, useState } from "react";
import { NextArrow, PrevArrow } from "../../utilis/Slider";
import axios from "axios";
import { Link } from "react-router-dom";
import GeneralSlider from "./GeneralSlider";
import GenresSlider from "./GenresSlider";

import { Formik, Form, Field } from "formik";

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

type searchtype = {
	search: string;
};
export default function MoviesList() {
	const [movies, setMovies] = useState<any[]>([]);
	const [genreMovie, setGenreMovie] = useState<any[]>([]);
	const [seacrhMovie, setSeacrhMovie] = useState<object[]>([]);
	const [error, setError] = useState<boolean>(false);
	const [onSearch, setOnSearch] = useState<boolean>(false);

	const initialValue = { search: "" };

	useEffect(() => {
		let Addlike: object = movies.map((movie) => (movie.isLike = false));
		setMovies([Addlike]);

		const movieApi = axios.get(`${process.env.REACT_APP_MOVIES_URL}`);
		const genresApi = axios.get(`${process.env.REACT_APP_GENRES_URL}`);

		axios
			.all([movieApi, genresApi])
			.then((res) => {
				setMovies(res[0].data.results);
				setSeacrhMovie(res[0].data.results);
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

	const handleSearch = (
		values: searchtype,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();

		let backUp = [];

		if (values.search !== "") {
			backUp = seacrhMovie.filter((v) => {
				setOnSearch(true);
				//@ts-ignore
				return v.title.toLowerCase().includes(values.search.toLowerCase());
			});
		} else {
			backUp = seacrhMovie;
			setError(false);
			setOnSearch(false);
		}

		setMovies(backUp);
	};
	return (
		<>
			<Formik initialValues={initialValue} onSubmit={handleSearch}>
				<Form>
					<div className="form-group">
						<Field type="text" name="search" />
						<button type="submit">
							<i className="fal fa-search"></i>
						</button>
					</div>
				</Form>
			</Formik>
			<Link className="logout" to="/">
				Logout
			</Link>

			<div className="list">
				<h1>All</h1>
				{error && <h2>NO Record Found</h2>}
				<GeneralSlider
					sliderSettings={{ ...sliderSettings }}
					movies={movies}
					onSearch={onSearch}
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
