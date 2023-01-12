import { Link } from 'react-router-dom';

const SignUpForm = () => {
    return (
        <>
            <section>
                <h1>Sign Up</h1>
                <i>use Google</i>
                <i>use appple</i>
                <Link to='/login'>login</Link>
            </section>
        </>
    );
};

export default SignUpForm;
