import React from "react";
import { SearchBar } from "./SearchBar";
import MoviesList from "./common/MoviesList";
import "../app.scss";

export default function Home() {
	return (
		<div>
			<SearchBar />
			<MoviesList />
		</div>
	);
}
