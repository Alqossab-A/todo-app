import { Formik, Field, Form, ErrorMessage} from 'formik';
import { validateSignUpForm } from '../utils/validateSignUpForm';

const SignUpPage = () => {
    const handleSubmit = (values, { resetForm}) => {
        console.log( 'form values:', values);
        console.log('in JSON formate:', JSON.stringify(values));
        resetForm();
    };

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                phoneNum: '',
                email: '',
                agree: false,
                contactType: 'By Phone',
                feedback: ''
            }}
            onSubmit={handleSubmit}
            validate={validateSignUpForm}
        >
            <Form>
                <div>sign up</div>
            </Form>
        </Formik>
    )
};

export default SignUpPage;