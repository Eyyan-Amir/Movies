import { SearchInput } from "./SearchInput";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MovieDetail from "./common/MovieDetail";
import Login from "./Login";
import Registration from "./Registration";
import MovieSearch from "./common/MovieSearch";
import "../App.scss";

export default function Index() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="register" element={<Registration />} />
				<Route path="home" element={<Home />} />
				<Route path="detail/:id" element={<MovieDetail />} />
				<Route path="home/search/:name" element={<MovieSearch />} />
			</Routes>
		</div>
	);
}
