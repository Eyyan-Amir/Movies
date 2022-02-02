import { createAction } from "@reduxjs/toolkit";

import {
	SET_MOVIE,
	SET_GENRE,
	SET_SEARCH_Result,
	SET_MOVIE_DETAILS,
	ADD_COMMENT,
	SET_USER,
} from "../constant/constants";

import axios from "axios";

export const setMovies = createAction(SET_MOVIE, (moviesList: any) => {
	return {
		payload: moviesList,
	};
});

export const setGenre = createAction(SET_GENRE, (moviesList: any) => {
	return {
		payload: moviesList,
	};
});

export const setSearchResult = createAction(
	SET_SEARCH_Result,
	(MoviesList: any) => {
		return {
			payload: MoviesList,
		};
	}
);

export const setMovieDetail = createAction(
	SET_MOVIE_DETAILS,
	(MovieDetail: any) => {
		return {
			payload: MovieDetail,
		};
	}
);

export const addComment = createAction(ADD_COMMENT, (comment: object) => {
	return {
		payload: comment,
	};
});

export const setUser = createAction(SET_USER, (user: any) => {
	return {
		payload: user,
	};
});

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

export const fetchSearchMovie = (movie: any) => {
	return (dispatch: any) => {
		axios
			.get(`${process.env.REACT_APP_SEARCH_MOVIE}${movie}`)
			.then((response) => dispatch(setSearchResult(response.data.results)))
			.catch((err) => console.log(err));
	};
};
