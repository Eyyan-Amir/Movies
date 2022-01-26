import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import ErrorText from "./common/ErrorText";

interface RegistrationProps {
	name: string;
	email: string;
	password: string;
}
export default function Registration() {
	const [records, setRecords] = useState<Object[]>([]);

	const initialValue: RegistrationProps = { name: "", email: "", password: "" };

	let validationSchema = yup.object({
		name: yup.string().required("Required"),
		email: yup.string().email("invalid").required("Required"),
		password: yup.string().required("Required"),
	});

	useEffect(() => {
		localStorage.setItem("users", JSON.stringify(records));
	}, [records]);

	const handleSubmit = (
		values: RegistrationProps,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();
		setRecords([...records, values]);
	};

	return (
		<>
			<Formik
				initialValues={initialValue}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<Form className="login-form">
					<h1>Registration Form</h1>
					<Field type="text" name="name" placeholder="name"></Field>
					<ErrorMessage name="name" component={ErrorText} />
					<Field type="email" name="email" placeholder="email"></Field>
					<ErrorMessage name="email" component={ErrorText} />

					<Field type="password" name="password" placeholder="password"></Field>
					<ErrorMessage name="password" component={ErrorText} />

					<button type="submit">register</button>
					<Link to="/">Sign In</Link>
				</Form>
			</Formik>
		</>
	);
}
