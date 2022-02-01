import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import TextError from "./common/ErrorText";
import * as yup from "yup";

interface Searchtype {
	search: string;
}

export const SearchBar = () => {
	const navigate = useNavigate();

	const validationSchema = yup.object({
		search: yup.string().required("required"),
	});

	const initialValue = { search: "" };

	const handleSearch = (
		values: Searchtype,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();
		navigate(`/home/search/${values.search}`);
	};
	return (
		<>
			<Formik
				initialValues={initialValue}
				onSubmit={handleSearch}
				validationSchema={validationSchema}
			>
				<Form>
					<div className="form-group">
						<Field type="text" name="search" />
						<button type="submit">
							<i className="fal fa-search"></i>
						</button>
					</div>
					<ErrorMessage name="search" component={TextError} />
				</Form>
			</Formik>
			<Link className="logout" to="/">
				Logout
			</Link>
		</>
	);
};
