import axios from "axios";

export const ApiCall = () => {
	let movies: object[] = [];
	axios
		.get(`${process.env.REACT_APP_MOVIES_URL}`)
		.then((response) => {
			movies = response.data.results;
		})
		.catch((err) => console.log(err));
	return movies;
};
