import { Link } from 'react-router-dom';

const LoginForm = () => {
    return (
        <>
            <section>
                <h1>Login</h1>
                <i>use google</i>
                <i>use apple</i>
                <Link to='/signup'>signup</Link>
            </section>
        </>
    );
};

export default LoginForm;
