import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorText from "./ErrorText";

interface CommentType {
	initialValue: object;
	handleSubmit: any;
	validationSchema: object;
	type: string;
	control: string;
	name: string;
	placeHolder: string;
}

export default function CommentsForm({
	initialValue,
	handleSubmit,
	validationSchema,
	type,
	control,
	name,
	placeHolder,
}: CommentType) {
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
				<ErrorMessage name={name} component={ErrorText} />
			</Form>
		</Formik>
	);
}
