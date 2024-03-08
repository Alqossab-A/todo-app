import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { postSignUp } from './userSlice';
import {
    StyledForm,
    StyledField,
    StyledButton,
    StyledErr,
} from './styles/SignUpForm.styled';
import { validateUserLoginForm } from '../../utils/validateUserLoginForm';

const SignUpForm = () => {
    const dispatch = useDispatch();

    const handleSignUp = (values) => {
        const signup = {
            username: values.username,
            password: values.password,
        };

        dispatch(postSignUp(signup));
    };

    //TODO add a check for 2 passwords to match
    // add protection from bots with fake field and captions

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={handleSignUp}
                validate={validateUserLoginForm}
            >
                <StyledForm>
                    <StyledField
                        id={'username'}
                        name={'username'}
                        placeholder='Username'
                    />
                    <ErrorMessage name='username'>
                        {(msg) => <StyledErr>{msg}</StyledErr>}
                    </ErrorMessage>

                    <StyledField
                        id={'password'}
                        name={'password'}
                        placeholder='Password'
                    />
                    <ErrorMessage name='password'>
                        {(msg) => <StyledErr>{msg}</StyledErr>}
                    </ErrorMessage>

                    <StyledButton type='submit'>Sign Up</StyledButton>
                    <Link to='/login'>login</Link>
                </StyledForm>
            </Formik>
        </>
    );
};

export default SignUpForm;
