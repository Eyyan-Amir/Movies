import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentsForm from "./CommentsForm";
import { useSelector, useDispatch } from "react-redux";
import { setMovieDetail, addComment } from "../../redux/reducer/reducer";

interface CommentType {
	comment: "";
}

function MovieDetail() {
	const initialValue: CommentType = { comment: "" };

	const { id } = useParams();

	const dispatch = useDispatch();

	const { MovieDetail, comment } = useSelector(
		(state) =>
			//@ts-ignore
			state.moviesReducer
	);

	const validationSchema = yup.object({
		comment: yup
			.string()
			.required("required")
			.min(3, "minimum enter 3 letters"),
	});

	const handleSubmit = (
		values: CommentType,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();
		dispatch(addComment([...comment, values]));
	};

	useEffect(() => {
		let url = `${process.env.REACT_APP_DETAIL_MOVIE}`.replace(
			"detail-movie",
			`${id}`
		);
		axios
			.get(url)
			.then((response) => {
				dispatch(setMovieDetail(response.data));
			})
			.catch((err) => console.log(err));

		JSON.parse(localStorage.getItem("users") || "{}");
	}, []);

	useEffect(() => {
		localStorage.setItem("comments", JSON.stringify(comment));
	}, [comment]);

	return (
		<>
			<Link to={"/home"}>back</Link>

			<div className="movie-detail">
				<div className="d-flex">
					<div className="image my-3">
						<img
							src={`${process.env.REACT_APP_MOVIES_IMG}${MovieDetail.backdrop_path}`}
							alt=""
							className="img-fluid h-100"
						/>
					</div>
					<div className="detail my-3">
						<p>
							<span className="bold">OverView :</span> {MovieDetail.overview}
						</p>
						<p>
							<span className="bold">popularity :</span>{" "}
							{MovieDetail.popularity}
						</p>
						<p>
							<span className="bold">Budget :</span> {MovieDetail.budget}
						</p>
						{MovieDetail.homepage && (
							<p>
								<span className="bold">HomePage :</span>{" "}
								<a href={MovieDetail.homepage}>{MovieDetail.homepage}</a>
							</p>
						)}
					</div>
				</div>
				<div className="title">{MovieDetail.title}</div>

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
					{comment.map((item: CommentType, i: number) => {
						return <li key={i}>{item.comment}</li>;
					})}
				</ul>
			</div>
		</>
	);
}

export default MovieDetail;
