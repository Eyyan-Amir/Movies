import {
	SET_MOVIE,
	SET_GENRE,
	SET_SEARCH_Result,
	SET_MOVIE_DETAILS,
	ADD_COMMENT,
	SET_USER,
} from "../constant/constants";

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
