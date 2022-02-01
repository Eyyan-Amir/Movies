import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

import {
	SET_MOVIE,
	SET_GENRE,
	SET_SEARCH_Result,
	SET_MOVIE_DETAILS,
	ADD_COMMENT,
	SET_USER,
} from "../constant/constants";

const initialState = {
	movies: [],
	genreMovies: [],
	searchResult: [],
	detailMovie: [],
	comment: [],
	users: [],
};

export const moviesReducer = (state = initialState, { type, payload }: any) => {
	switch (type) {
		case SET_MOVIE:
			return {
				...state,
				movies: payload,
			};
		case SET_GENRE:
			return {
				...state,
				genreMovies: payload,
			};
		case SET_SEARCH_Result:
			return {
				...state,
				searchResult: payload,
			};
		case SET_MOVIE_DETAILS:
			return {
				...state,
				detailMovie: payload,
			};
		case ADD_COMMENT:
			return {
				...state,
				comment: payload,
			};
		case SET_USER:
			return {
				...state,
				users: payload,
			};

		default:
			return state;
	}
};

export const fetchMovie = createAsyncThunk("fetchMovie", async () => {
	let response = await fetch(`${process.env.REACT_APP_MOVIES_URL}`);
	let result = await response.json();
	return result;
});

// export const moviesReducer = createReducer(initialState, (builder) => {
// 	builder.addCase(SET_MOVIE, (state, action) => {
// 		// state.movies = action.payload;
// 	});
// });
