import axios from "axios";

export const setMovies = (movieList: any) => {
	return {
		type: "SET_MOVIE",
		payload: movieList,
	};
};

export const setGenre = (movieList: any) => {
	return {
		type: "SET_GENRE",
		payload: movieList,
	};
};

export const setSearchMovies = (movieList: any) => {
	return {
		type: "SET_SEARCH_MOVIE",
		payload: movieList,
	};
};

export const setMovieDetail = (movieList: any) => {
	return {
		type: "SET_DETAIL_MOVIE",
		payload: movieList,
	};
};

export const addComments = (items: any) => {
	return {
		type: "ADD_COMMENTS",
		payload: items,
	};
};

export const setRegistration = (items: any) => {
	return {
		type: "SET_REGISTRATION",
		payload: items,
	};
};
