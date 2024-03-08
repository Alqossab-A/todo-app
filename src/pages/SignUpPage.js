import SignUpForm from '../features/user/SignUpForm';
import {
    Container,
    StyledLogo,
    StyledHome,
    Wrapper,
    StyledTitle,
} from './styles/SignUpPage.styled';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSignedUp } from '../features/user/userSlice';

const SignUpPage = () => {
    const signedUp = useSelector((state) => state.user.signedUp);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (signedUp === true) {
            navigate('/login');
            dispatch(setSignedUp(false));
        }
    }, [signedUp, navigate, dispatch]);

    return (
        <Container>
            <Wrapper>
                <StyledLogo to='/'></StyledLogo>
                <StyledHome to='/'>Home</StyledHome>
            </Wrapper>
            <StyledTitle>Sign Up</StyledTitle>
            <SignUpForm />
            <Footer />
        </Container>
    );
};

export default SignUpPage;
