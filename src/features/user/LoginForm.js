import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { postLogin } from './userSlice';
import { validateUserLoginForm } from '../../utils/validateUserLoginForm';
import {
    StyledForm,
    StyledField,
    StyledButton,
    StyledErr,
} from './styles/LoginForm.styled';

const LoginForm = () => {
    const error = useSelector((state) => state.user.error);
    const dispatch = useDispatch();

    const handleLogin = (values) => {
        const login = {
            username: values.username,
            password: values.password,
        };

        dispatch(postLogin(login));
    };

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={handleLogin}
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
                        type={'password'}
                        id={'password'}
                        name={'password'}
                        placeholder='Password'
                    />
                    <ErrorMessage name='password'>
                        {(msg) => <StyledErr>{msg}</StyledErr>}
                    </ErrorMessage>
                    <StyledErr>{error}</StyledErr>

                    <StyledButton type='submit'>Login</StyledButton>
                    <Link to='/signup'>Sign Up</Link>
                </StyledForm>
            </Formik>
        </>
    );
};

export default LoginForm;
