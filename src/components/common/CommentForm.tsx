import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";

export default function FormikForm({
	initialValue,
	handleSubmit,
	validationSchema,
	type,
	control,
	name,
	placeHolder,
}: any) {
	return (
		<Formik
			initialValues={initialValue}
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
		>
			<Form className="d-flex">
				<Field
					as={control}
					text={type}
					name={name}
					placeholder={placeHolder}
				></Field>
				<button type="submit">Submit</button>
				<ErrorMessage name={name} component={TextError} />
			</Form>
		</Formik>
	);
}
