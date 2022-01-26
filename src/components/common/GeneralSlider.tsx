import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function GeneralSlider({
	sliderSettings,
	handleLike,
	movies,
	onSearch,
}: any) {
	return (
		<div>
			<Slider {...sliderSettings}>
				{movies.map((movie: any) => {
					return (
						<div
							className={onSearch ? "list-item on-search" : "list-item"}
							key={movie.id}
						>
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
											className={`${movie.isLike ? "fas" : "far"} fa-heart`}
											onClick={() => {
												handleLike(movie);
											}}
										>
											<span className="vote">{movie.vote_count}</span>
											<span className="vote">{movie.isLike}</span>
										</i>
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</Slider>
		</div>
	);
}
