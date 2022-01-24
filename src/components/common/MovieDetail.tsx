import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import TextError from "./TextError";
import axios from "axios";

interface comentProps {
	description: "";
}

export default function MovieDetail() {
	let MovieDetail = {
		title: "",
		backdrop_path: "",
		overview: "",
		popularity: "",
		budget: "",
		homepage: "",
	};

	const params = useParams();
	const paramsId = params.id;
	const [id, setId] = useState(paramsId);
	const [items, setItems] = useState<any[]>([]);
	const [detailMovie, setDetailMovie] = useState(MovieDetail);
	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${id}?api_key=4ce6fff0da52d2214a794776a6bba549&language=en-US`
			)
			.then((response) => {
				setDetailMovie(response.data);
			})
			.catch((err) => console.log(err));
		// console.log(detailMovie);
	}, []);

	const validationSchema = yup.object({
		description: yup.string().required("required"),
	});

	const handleSubmit = (
		values: comentProps,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();
		setItems([{ values }, ...items]);
	};
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
					<p>
						<span className="bold">HomePage :</span>{" "}
						<a href={detailMovie.homepage}>{detailMovie.homepage}</a>
					</p>
				</div>
			</div>
			<div className="title">{detailMovie.title}</div>
			<Formik
				initialValues={{ description: "" }}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<Form className="d-flex">
					<Field
						as="textarea"
						text="type"
						name="description"
						placeholder="comments"
					></Field>
					<button type="submit">Submit</button>
					<ErrorMessage name="description" component={TextError} />
				</Form>
			</Formik>
			<ul>
				{items.map((item, i) => {
					return <li key={i}>{item.values.description}</li>;
				})}
			</ul>
		</div>
	);
}
