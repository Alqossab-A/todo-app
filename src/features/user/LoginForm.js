import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, selectCurrentUser } from './userSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import defaultAvatar from '../../app/assets/img/emots.png';
import { validateUserLoginForm } from '../../utils/validateUserLoginForm';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    // const currentUser = useSelector(selectCurrentUser);

    const dispatch = useDispatch();

    const handleLogin = (values) => {
        const currentUser = {
            id: Date.now(),
            avatar: defaultAvatar,
            username: values.username,
            password: values.password,
        };
        dispatch(setCurrentUser(currentUser));
    };

    return (
        <>
            <span>
                {/* {currentUser ? (
                    <div style={{ width: '4rem', height: '4rem' }}>
                        <img
                            src={currentUser.avatar}
                            alt={'user'}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                ) : (
                    <button
                        outline
                        // onClick={}
                        style={{ color: 'white', border: '1px solid white' }}
                    >
                        <i className='fa fa-sign-in fa-lg' /> Login
                    </button>
                )} */}
            </span>

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={handleLogin}
                validate={validateUserLoginForm}
            >
                <Form>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <Field
                            id={'username'}
                            name={'username'}
                            placeholder='Username'
                            className='form-control'
                        />
                        <ErrorMessage name='username'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <Field
                            id={'password'}
                            name={'password'}
                            placeholder='Password'
                            className='form-control'
                        />
                        <ErrorMessage name='password'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </div>
                    <button type='submit' color='primary'>
                        Login
                    </button>
                </Form>
            </Formik>
            <Link to='/signup'>signUp</Link>
        </>
    );
};

export default LoginForm;
