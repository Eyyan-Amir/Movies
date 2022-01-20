import "./App.scss";
import MoviesList from "./components/common/MoviesList";
import { SearchInput } from "./components/common/SearchInput";

function App() {
	return (
		<div className="App">
			<SearchInput />
			<MoviesList />
		</div>
	);
}

export default App;
