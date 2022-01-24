import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as yup from "yup";
import TextError from "./common/TextError";

interface registrationProps {
	name: string;
	email: string;
	password: string;
}
export default function Registration() {
	const [records, setRecords] = useState<any>([]);
	let valideSchema = yup.object({
		name: yup.string().required("Required"),
		email: yup.string().email("invalid").required("Required"),
		password: yup.string().required("Required"),
	});
	const handleSubmit = (
		values: registrationProps,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();
		setRecords([...records, values]);
		localStorage.setItem("users", JSON.stringify(records));
	};
	return (
		<>
			<Formik
				initialValues={{ name: "", email: "", password: "" }}
				onSubmit={handleSubmit}
				validationSchema={valideSchema}
			>
				<Form className="login-form">
					<h1>Registration Form</h1>
					<Field type="text" name="name" placeholder="name"></Field>
					<ErrorMessage name="name" component={TextError} />
					<Field type="email" name="email" placeholder="email"></Field>
					<ErrorMessage name="email" component={TextError} />

					<Field type="password" name="password" placeholder="password"></Field>
					<ErrorMessage name="password" component={TextError} />

					<button type="submit">register</button>
				</Form>
			</Formik>
		</>
	);
}
