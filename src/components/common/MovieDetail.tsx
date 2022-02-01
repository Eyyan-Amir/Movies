import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentsForm from "./CommentsForm";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { setMovieDetail, addComment } from "../../redux/action/action";

interface CommentType {
	comment: "";
}

function MovieDetail({ items }: any) {
	const initialValue: CommentType = { comment: "" };

	const { id } = useParams();

	const dispatch = useDispatch();

	const validationSchema = yup.object({
		comment: yup.string().required("required"),
	});

	const handleSubmit = (
		values: CommentType,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();
		//@ts-ignore
		console.log(items.comment);
		dispatch(addComment([...items.comment, values]));
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
		localStorage.setItem("comments", JSON.stringify(items.comment));
	}, [items.comment]);

	return (
		<>
			<Link to={"/home"}>back</Link>

			<div className="movie-detail">
				<div className="d-flex">
					<div className="image my-3">
						<img
							src={`${process.env.REACT_APP_MOVIES_IMG}${items.detailMovie.backdrop_path}`}
							alt=""
							className="img-fluid h-100"
						/>
					</div>
					<div className="detail my-3">
						<p>
							<span className="bold">OverView :</span>{" "}
							{items.detailMovie.overview}
						</p>
						<p>
							<span className="bold">popularity :</span>{" "}
							{items.detailMovie.popularity}
						</p>
						<p>
							<span className="bold">Budget :</span> {items.detailMovie.budget}
						</p>
						{items.detailMovie.homepage && (
							<p>
								<span className="bold">HomePage :</span>{" "}
								<a href={items.detailMovie.homepage}>
									{items.detailMovie.homepage}
								</a>
							</p>
						)}
					</div>
				</div>
				<div className="title">{items.detailMovie.title}</div>

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
					{items.comment.map((item: any, i: number) => {
						return <li key={i}>{item.comment}</li>;
					})}
				</ul>
			</div>
		</>
	);
}

const mapStateToProps = (state: any) => {
	return {
		items: state.rootReducer.movie,
	};
};

export default connect(mapStateToProps)(MovieDetail);
