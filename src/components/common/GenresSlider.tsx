import { Link } from "react-router-dom";
import Slider from "react-slick";

interface GenresSlider {
	sliderSettings: any;
	handleLike: any;
	movies: object[];
}

export default function GenresSlider({
	sliderSettings,
	handleLike,
	movies,
}: GenresSlider) {
	return (
		<div>
			{movies.map((movie: any, i: number) => {
				return (
					<div key={i}>
						<h1 className="mt-5">{movie.name}</h1>
						<Slider {...sliderSettings}>
							{movie.movies.map((item: any) => {
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
															item.isLike ? "fas" : "far"
														} fa-heart`}
														onClick={() => {
															handleLike(item);
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
