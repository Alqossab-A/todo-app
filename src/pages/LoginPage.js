import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/user/userSlice';
import {
    StyledLogo,
    Wrapper,
    Container,
    StyledHome,
    StyledTitle,
} from './styles/LoginPage.styled';
import LoginForm from '../features/user/LoginForm';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {
    const currentUser = useSelector(selectCurrentUser);
    const username = currentUser ? currentUser.username : null;
    const navigate = useNavigate();

    useEffect(() => {
        if (username !== null) {
            navigate('/');
        }
    }, [username, navigate]);

    return (
        <Container>
            <Wrapper>
                <StyledLogo to='/'></StyledLogo>
                <StyledHome to='/'>Home</StyledHome>
            </Wrapper>
            <StyledTitle>Login</StyledTitle>
            <LoginForm />
            <Footer />
        </Container>
    );
};

export default LoginPage;
