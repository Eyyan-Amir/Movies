import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MovieDetail from "./common/MovieDetail";
import Login from "./Login";
import Registration from "./Registration";
import MovieSearch from "./common/MovieSearch";

export default function Index() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="home" element={<Home />} />
				<Route path="register" element={<Registration />} />
				<Route path="detail/:id" element={<MovieDetail />} />
				<Route path="home/search" element={<MovieSearch />} />
			</Routes>
		</div>
	);
}
