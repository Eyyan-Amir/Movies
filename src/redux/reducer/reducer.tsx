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
	items: [],
	records: [],
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
				items: payload,
			};
		case SET_USER:
			return {
				...state,
				records: payload,
			};

		default:
			return state;
	}
};
