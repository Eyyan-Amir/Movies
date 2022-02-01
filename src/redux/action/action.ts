import {
	SET_MOVIE,
	SET_GENRE,
	SET_SEARCH_Result,
	SET_MOVIE_DETAILS,
	ADD_COMMENT,
	SET_USER,
} from "../constant/constants";

import axios from "axios";

export const setMovies = (moviesList: any) => {
	return {
		type: SET_MOVIE,
		payload: moviesList,
	};
};

export const setGenre = (genreMoviesList: any) => {
	return {
		type: SET_GENRE,
		payload: genreMoviesList,
	};
};

export const setSearchResult = (searchResult: any) => {
	return {
		type: SET_SEARCH_Result,
		payload: searchResult,
	};
};

export const setMovieDetail = (MovieDetail: any) => {
	return {
		type: SET_MOVIE_DETAILS,
		payload: MovieDetail,
	};
};

export const addComment = (comment: object) => {
	return {
		type: ADD_COMMENT,
		payload: comment,
	};
};

export const setUser = (user: any) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

export const fetchSearchMovie = (movie: any) => {
	return (dispatch: any) => {
		axios
			.get(`${process.env.REACT_APP_SEARCH_MOVIE}${movie}`)
			.then((response) => dispatch(setSearchResult(response.data.results)))
			.catch((err) => console.log(err));
	};
};

export const fetchMovies = () => {
	return (dispatch: any) => {
		axios
			.get(`${process.env.REACT_APP_MOVIES_URL}`)
			.then((response) => dispatch(setMovies(response.data.results)))
			.catch((err) => console.log(err));
	};
};

export const fetchGenresMovies = (movies: any) => {
	return (dispatch: any) => {
		axios
			.get(`${process.env.REACT_APP_GENRES_URL}`)
			.then((res) => {
				let filteredGenres: any = [];

				res.data.genres.map((m: any) => {
					m.movies = [];
					movies.forEach((movie: any) => {
						if (movie.genre_ids.includes(m.id)) {
							m.movies.push(movie);
						}
					});
					filteredGenres.push(m);
				});
				dispatch(setGenre([...filteredGenres]));
			})
			.catch((errors) => {
				console.error(errors);
			});
	};
};
