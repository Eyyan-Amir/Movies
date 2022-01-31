interface ActionType {
	type: string;
}

const initialState = {
	movies: [],
	genreMovies: [],
	searchMovies: [],
	detailMovie: [],
	items: [],
};

export const moviesReducer = (state = initialState, { type, payload }: any) => {
	switch (type) {
		case "SET_MOVIE":
			return {
				...state,
				movies: payload,
			};
		case "SET_GENRE":
			return {
				...state,
				genreMovies: payload,
			};
		case "SET_SEARCH_MOVIE":
			return {
				...state,
				searchMovies: payload,
			};
		case "SET_DETAIL_MOVIE":
			return {
				...state,
				detailMovie: payload,
			};
		case "ADD_COMMENTS":
			return {
				...state,
				items: payload,
			};

		default:
			return state;
	}
};
