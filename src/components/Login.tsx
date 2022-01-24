import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import TextError from "./common/TextError";

interface loginProps {
	email: "";
	password: "";
}
export default function Login() {
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
	};
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

					<button>Login</button>
				</Form>
			</Formik>
		</>
	);
}
