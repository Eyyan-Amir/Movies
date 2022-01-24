import { useState } from "react";
import TextError from "./common/TextError";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

interface loginProps {
	email: "";
	password: "";
}
export default function Login() {
	const navigate = useNavigate();
	const [records, setRecords] = useState<any[]>([]);

	let valideSchema = yup.object({
		email: yup.string().email("invalid").required("Required"),
		password: yup.string().required("Required"),
	});
	const handleSubmit = (
		values: loginProps,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();
		let users = JSON.parse(localStorage.getItem("users") || "{}");
		let user = users.find((u: any) => u.email === values.email);

		if (user.password === values.password) {
			navigate("/");
		} else {
			alert("in-valid credential");
		}
	}; // if (result) {
	// 	return;
	// } else {
	// }

	return (
		<>
			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={handleSubmit}
				validationSchema={valideSchema}
			>
				<Form className="login-form">
					<h1>Login Form</h1>
					<Field type="email" name="email" placeholder="email"></Field>
					<ErrorMessage name="email" component={TextError} />

					<Field type="password" name="password" placeholder="password"></Field>
					<ErrorMessage name="password" component={TextError} />

					<button type="submit">Login</button>
				</Form>
			</Formik>
		</>
	);
}
