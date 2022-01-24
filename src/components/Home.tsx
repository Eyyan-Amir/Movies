import { SearchInput } from "./common/SearchInput";
import MoviesList from "./common/MoviesList";
import "../App.scss";

export default function Home() {
	return (
		<div>
			<SearchInput />
			<MoviesList />
		</div>
	);
}
