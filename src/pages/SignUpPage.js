import { Link } from 'react-router-dom';
import SignUpForm from '../features/user/SignUpForm';

const SignUpPage = () => {
    return (
        <>
            <Link to='/'>logo</Link>
            <SignUpForm />
        </>
    );
};

export default SignUpPage;
