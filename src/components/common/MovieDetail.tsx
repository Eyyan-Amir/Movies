import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import CommentsForm from "./CommentsForm";

interface CommentType {
	comment: "";
}

export default function MovieDetail() {
	const movieDetail = {
		title: "",
		backdrop_path: "",
		overview: "",
		popularity: "",
		budget: "",
		homepage: "",
	};

	const initialValue: CommentType = { comment: "" };

	const { id } = useParams();

	const [items, setItems] = useState<CommentType[]>([]);
	const [detailMovie, setDetailMovie] = useState(movieDetail);

	const validationSchema = yup.object({
		comment: yup.string().required("required"),
	});

	const handleSubmit = (
		values: CommentType,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();
		setItems([...items, values]);
	};

	useEffect(() => {
		let url = `${process.env.REACT_APP_DETAIL_MOVIE}`.replace(
			"detail-movie",
			`${id}`
		);
		axios
			.get(url)
			.then((response) => {
				setDetailMovie(response.data);
			})
			.catch((err) => console.log(err));

		JSON.parse(localStorage.getItem("users") || "{}");
	}, []);

	useEffect(() => {
		localStorage.setItem("comments", JSON.stringify(items));
	}, [items]);

	return (
		<div className="movie-detail">
			<div className="d-flex">
				<div className="image my-3">
					<img
						src={`${process.env.REACT_APP_MOVIES_IMG}${detailMovie.backdrop_path}`}
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

			<CommentsForm
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
