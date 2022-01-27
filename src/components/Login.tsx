import TextError from "./common/ErrorText";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";

interface LoginCredentialType {
	email: "";
	password: "";
}
export default function Login() {
	const navigate = useNavigate();

	const initialValue: LoginCredentialType = { email: "", password: "" };

	let validationSchema = yup.object({
		email: yup.string().email("invalid").required("Required"),
		password: yup.string().required("Required"),
	});

	const handleSubmit = (
		values: LoginCredentialType,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(false);
		resetForm();
		let users = JSON.parse(localStorage.getItem("users") || "{}");
		let user = users.find((u: LoginCredentialType) => u.email === values.email);

		if (user.password === values.password) {
			navigate("/home");
		} else {
			alert("in-valid credential");
		}
	};

	return (
		<>
			<Formik
				initialValues={initialValue}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<Form className="login-form">
					<h1>Login Form</h1>
					<Field type="email" name="email" placeholder="email"></Field>
					<ErrorMessage name="email" component={TextError} />

					<Field type="password" name="password" placeholder="password"></Field>
					<ErrorMessage name="password" component={TextError} />

					<button type="submit">Login</button>
					<Link to={"/register"}>Sign Up</Link>
				</Form>
			</Formik>
		</>
	);
}
