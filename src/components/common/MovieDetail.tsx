import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import FormikForm from "./FormkForm";

interface CommentProps {
	comment: "";
}

export default function MovieDetail() {
	let movieDetail = {
		title: "",
		backdrop_path: "",
		overview: "",
		popularity: "",
		budget: "",
		homepage: "",
	};

	const initialValue: CommentProps = { comment: "" };

	const params = useParams();

	const paramsId = params.id;

	const [items, setItems] = useState<CommentProps[]>([]);

	const [comment, setComment] = useState<CommentProps[]>([]);

	const [detailMovie, setDetailMovie] = useState(movieDetail);

	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${paramsId}?api_key=4ce6fff0da52d2214a794776a6bba549&language=en-US`
			)
			.then((response) => {
				setDetailMovie(response.data);
			})
			.catch((err) => console.log(err));

		let users = JSON.parse(localStorage.getItem("users") || "{}");
	}, []);

	const validationSchema = yup.object({
		comment: yup.string().required("required"),
	});

	const handleSubmit = (
		values: CommentProps,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();
		setItems([...items, values]);
	};
	useEffect(() => {
		localStorage.setItem("comments", JSON.stringify(items));
		// let getComment = JSON.parse(localStorage.getItem("comments") || "{}");
		// setComment(getComment);
	}, [items]);
	return (
		<div className="movie-detail">
			<div className="d-flex">
				<div className="image my-3">
					<img
						src={`https://image.tmdb.org/t/p/w500${detailMovie.backdrop_path}`}
						alt=""
						className="img-fluid h-100"
					/>
				</div>
				<div className="detail my-3">
					<p>
						<span className="bold">OverView :</span> {detailMovie.overview}
					</p>
					<p>
						<span className="bold">popularity :</span> {detailMovie.popularity}
					</p>
					<p>
						<span className="bold">Budget :</span> {detailMovie.budget}
					</p>
					{detailMovie.homepage && (
						<p>
							<span className="bold">HomePage :</span>{" "}
							<a href={detailMovie.homepage}>{detailMovie.homepage}</a>
						</p>
					)}
				</div>
			</div>
			<div className="title">{detailMovie.title}</div>

			<FormikForm
				initialValue={initialValue}
				handleSubmit={handleSubmit}
				validationSchema={validationSchema}
				type="text"
				control="textarea"
				name="comment"
				placeHolder="comments"
			/>
			<ul>
				{items.map((item, i) => {
					return <li key={i}>{item.comment}</li>;
				})}
			</ul>
		</div>
	);
}
