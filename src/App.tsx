import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import MovieDetail from "./components/common/MovieDetail";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Registration />} />
				<Route path="detail/:id" element={<MovieDetail />} />
			</Routes>
		</div>
	);
}

export default App;
