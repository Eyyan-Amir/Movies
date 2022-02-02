import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MovieDetail from "./common/MovieDetail";
import Login from "./Login";
import Registration from "./Registration";
import SearchResult from "./common/SearchResult";
import "../app.scss";

export default function Routing() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="register" element={<Registration />} />
			<Route path="home" element={<Home />} />
			<Route path="detail/:id" element={<MovieDetail />} />
			<Route path="home/search/:name" element={<SearchResult />} />
		</Routes>
	);
}
