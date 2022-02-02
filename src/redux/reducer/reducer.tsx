import React from "react";
import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface initialStateType {
	movies: [];
	genreMovies: [];
	searchResult: [];
	MovieDetail: [];
	comment: [];
	users: [];
}

const initialState: initialStateType = {
	movies: [],
	genreMovies: [],
	searchResult: [],
	MovieDetail: [],
	comment: [],
	users: [],
};

export const getMovies = createAsyncThunk(
	"getMovies",
	(params, { dispatch }) => {
		axios
			.get(`${process.env.REACT_APP_MOVIES_URL}`)
			.then((response) => {
				let newMovies = response.data.results.map((movie: any) => {
					return {
						...movie,
						isLiked: false,
					};
				});
				dispatch(setMovies(newMovies));
			})
			.catch((err) => console.log(err));
	}
);

export const getGenresMovies = createAsyncThunk(
	"getGenresMovies",
	({ movies }: any, { dispatch }) => {
		axios
			.get(`${process.env.REACT_APP_GENRES_URL}`)
			.then((response) => {
				let filterGenres: any = [];

				response.data.genres.map((m: any) => {
					m.movies = [];
					movies?.forEach((movie: any) => {
						if (movie.genre_ids.includes(m.id)) {
							m.movies.push(movie);
						}
					});
					filterGenres.push(m);
				});
				dispatch(setGentresMovies([...filterGenres]));
			})
			.catch((err) => console.log(err));
	}
);

export const getSearchMovies = createAsyncThunk(
	"getSearchMovies",
	async (movie: any) => {
		let response = await fetch(`${process.env.REACT_APP_SEARCH_MOVIE}${movie}`);
		let movies = await response.json();
		return movies.results;
	}
);

const moviesReducer = createSlice({
	name: "movies",
	initialState,
	reducers: {
		setMovieDetail(state, { payload }: PayloadAction<any>) {
			state.MovieDetail = payload;
		},
		addComment(state, { payload }: PayloadAction<any>) {
			state.comment = payload;
		},
		setUser(state, { payload }: PayloadAction<any>) {
			state.users = payload;
		},

		setMovies(state, { payload }: PayloadAction<any>) {
			state.movies = payload;
		},
		setGentresMovies(state, { payload }: PayloadAction<any>) {
			state.genreMovies = payload;
		},
		toggleIsLiked(state, { payload }: PayloadAction<any>) {
			state.movies = payload;
		},
	},
	extraReducers: {
		//@ts-ignore
		[getMovies.fulfilled]: (state, { payload }: any) => {
			state.movies = payload;
		},
		//@ts-ignore
		[getGenresMovies.fulfilled]: (state, { payload }: any) => {
			state.genreMovies = payload;
		},
		//@ts-ignore
		[getSearchMovies.fulfilled]: (state, { payload }: any) => {
			state.searchResult = payload;
		},
	},
});

export const {
	setMovieDetail,
	addComment,
	setUser,
	setMovies,
	setGentresMovies,
	toggleIsLiked,
} = moviesReducer.actions;

export default moviesReducer.reducer;
