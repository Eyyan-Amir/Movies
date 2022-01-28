import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";

interface Searchtype {
	search: string;
}

export const SearchBar = () => {
	const navigate = useNavigate();

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
			<Formik initialValues={initialValue} onSubmit={handleSearch}>
				<Form>
					<div className="form-group">
						<Field type="text" name="search" />
						<button type="submit">
							<i className="fal fa-search"></i>
						</button>
					</div>
				</Form>
			</Formik>
			<Link className="logout" to="/">
				Logout
			</Link>
		</>
	);
};
