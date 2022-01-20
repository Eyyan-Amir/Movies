import { Formik, Form, Field } from "formik";

type searchtype = {
	search: string;
};

export const SearchInput = () => {
	const handleSearch = (
		values: searchtype,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();
	};
	return (
		<Formik initialValues={{ search: "" }} onSubmit={handleSearch}>
			<Form>
				<div className="form-group">
					<Field type="text" name="search" />
					<button type="submit">
						<i className="fal fa-search"></i>
					</button>
				</div>
			</Form>
		</Formik>
	);
};
