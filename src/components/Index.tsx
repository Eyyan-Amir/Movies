import { Routes, Route } from "react-router-dom";
import Home from "./Home";

import MovieDetail from "./common/MovieDetail";
import Login from "./Login";
import Registration from "./Registration";

export default function Index() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Registration />} />
				<Route path="detail/:id" element={<MovieDetail />} />
			</Routes>
		</div>
	);
}
