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

export const moviesReducer = createReducer(initialState, (builder) => {
	builder.addCase(SET_MOVIE, (state, { payload }: any) => {
		state.movies = payload;
	});
	builder.addCase(SET_GENRE, (state, { payload }: any) => {
		state.genreMovies = payload;
	});
	builder.addCase(SET_SEARCH_Result, (state, { payload }: any) => {
		state.searchResult = payload;
	});
	builder.addCase(SET_MOVIE_DETAILS, (state, { payload }: any) => {
		state.detailMovie = payload;
	});
	builder.addCase(ADD_COMMENT, (state, { payload }: any) => {
		state.comment = payload;
	});
	builder.addCase(SET_USER, (state, { payload }: any) => {
		state.users = payload;
	});
});
