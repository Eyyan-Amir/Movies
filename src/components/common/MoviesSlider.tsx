import { Link } from "react-router-dom";
import Slider from "react-slick";

interface MoviesSliderProps {
	sliderSettings: any;
	handleLikeClick: any;
	movies: object[];
}

export default function MoviesSlider({
	sliderSettings,
	handleLikeClick,
	movies,
}: MoviesSliderProps) {
	return (
		<div>
			<Slider {...sliderSettings}>
				{movies?.map((movie: any, i: number) => (
					<div className="list-item" key={i}>
						<div className="list-item-image">
							<img
								src={`${process.env.REACT_APP_MOVIES_IMG}${movie.backdrop_path}`}
								alt=""
								className="img-fluid"
							/>
						</div>
						<div className="text-wrapper">
							<div className="list-item-logo">
								<img
									src={`${process.env.REACT_APP_MOVIES_IMG}${movie.poster_path}`}
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
										<span className="vote">{movie.vote_count}</span>
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
