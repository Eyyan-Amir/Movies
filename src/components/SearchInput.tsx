import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";

type searchtype = {
	search: string;
};

export const SearchInput = () => {
	const navigate = useNavigate();

	const initialValue = { search: "" };

	const handleSearch = (
		values: searchtype,
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
