import { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { setGenre } from "../../redux/action/action";

interface GenresSliderProps {
	sliderSettings: any;
	handleLikeClick: any;
	movies: object[];
}

export default function GenresSlider({
	sliderSettings,
	handleLikeClick,
	movies,
}: GenresSliderProps) {
	return (
		<div>
			{movies.map((movie: any, i: number) => {
				return (
					<div key={i}>
						<h1 className="mt-5">{movie.name}</h1>
						<Slider {...sliderSettings}>
							{movie.movies?.length &&
								movie.movies?.map((item: any) => {
									return (
										<div className="list-item" key={item.id}>
											<div className="list-item-image">
												<img
													src={`${process.env.REACT_APP_MOVIES_IMG}${item.backdrop_path}`}
													alt=""
													className="img-fluid"
												/>
											</div>

											<div className="text-wrapper">
												<div className="list-item-logo">
													<img
														src={`${process.env.REACT_APP_MOVIES_IMG}${item.poster_path}`}
														alt=""
														className="img-fluid"
													/>
												</div>
												<div className="list-item-title">
													<Link to={`/detail/${item.id}`}>{item.title}</Link>
													<span className="d-block">
														<i
															className={`${
																item.isLiked ? "fas" : "far"
															} fa-heart`}
															onClick={() => {
																handleLikeClick(item);
															}}
														>
															<span className="vote">{item.vote_count}</span>
															<span className="vote">{item.isLike}</span>
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
			})}
		</div>
	);
}
