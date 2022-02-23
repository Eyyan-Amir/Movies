import { Link } from "react-router-dom";
import Slider from "react-slick";

interface MoviesSliderProps {
	sliderSettings: any;
	handleLikeClick: any;
	movies: object[];
}

interface MoviesType {
	backdropPath: string;
	posterPath: string;
	title: string;
	id: number;
	isLiked: boolean;
	voteCount: number;
}

export default function MoviesSlider({
	sliderSettings,
	handleLikeClick,
	movies,
}: MoviesSliderProps) {
	let latestMovies = movies?.map((movie: any) => {
		let newMovies: any = {};
		newMovies.backdropPath = movie.backdrop_path;
		newMovies.posterPath = movie.poster_path;
		newMovies.title = movie.title;
		newMovies.id = movie.id;
		newMovies.isLiked = movie.isLiked;
		newMovies.voteCount = movie.vote_count;
		return newMovies;
	});

	return (
		<div>
			<Slider {...sliderSettings}>
				{latestMovies?.map((movie: MoviesType, i: number) => (
					<div className="list-item" key={i}>
						<div className="list-item-image">
							<img
								src={`${process.env.REACT_APP_MOVIES_IMG}${movie.backdropPath}`}
								alt=""
								className="img-fluid"
							/>
						</div>
						<div className="text-wrapper">
							<div className="list-item-logo">
								<img
									src={`${process.env.REACT_APP_MOVIES_IMG}${movie.posterPath}`}
									alt=""
									className="img-fluid"
								/>
							</div>
							<div className="list-item-title">
								<Link to={`/detail/${movie.id}`}>{movie.title}</Link>

								<span className="d-block">
									<i
										className={`${movie.isLiked ? "fas" : "far"} fa-heart`}
										onClick={() => {
											handleLikeClick(movie);
										}}
									>
										<span className="vote">{movie.voteCount}</span>
									</i>
								</span>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
}
