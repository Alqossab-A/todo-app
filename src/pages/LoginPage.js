import { Link } from 'react-router-dom';
import LoginForm from '../features/user/LoginForm';

const LoginPage = () => {
    return (
        <>  
            <Link to='/'>logo</Link>
            <LoginForm />
        </>
    )
};

export default LoginPage;