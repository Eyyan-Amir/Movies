import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

function SampleNextArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block", right: "0px" }}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{
				...style,
				display: "block",
				left: "0px",
				zIndex: 1,
			}}
			onClick={onClick}
		/>
	);
}

export default function MoviesList() {
	const [movies, setMovies] = useState<any[]>([]);
	const [like, setLike] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get(
				"https://api.themoviedb.org/3/movie/top_rated?api_key=4ce6fff0da52d2214a794776a6bba549&page=3"
			)
			.then((response) => setMovies(response.data.results))
			.catch((err) => console.log(err));
	}, []);
	useEffect(() => {}, [movies]);
	const settings = {
		dots: false,
		infinite: false,
		speed: 1000,
		slidesToShow: 5,
		slidesToScroll: 1,
		spaceBetween: 20,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	const handleIcon = () => {};

	return (
		<div className="list">
			<Slider {...settings}>
				{movies.map((movie) => {
					return (
						<div className="list__item" key={movie.id}>
							<div className="list__item--image">
								<img
									src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
									alt=""
									className="img-fluid"
								/>
							</div>
							<div className="textWrapper">
								<div className="list__item--logo">
									<img
										src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
										alt=""
										className="img-fluid"
									/>
								</div>
								<div className="list__item--title">
									<h3>{movie.title}</h3>
									<span>
										<i
											className={`${like ? "fas" : "far"} fa-heart`}
											onClick={() => {
												setLike(!like);
											}}
										></i>
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
