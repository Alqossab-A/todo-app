import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import logo from '../../app/assets/svgs/LeeGoGoNotes.svg';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledLogo = styled(Link)`
    background-image: url(${logo});
    background-repeat: no-repeat;
    background-size: 10rem;
    padding: 3rem 2rem 0 12rem;
`;

export const StyledHome = styled(Link)`
    margin: 1rem;
    font-size: 1.3rem;
    font-family: 'Virgil', sans-serif;
    text-decoration: none;
    color: black;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    margin: 5rem 0 2rem 0;
`;

export const StyledLogout = styled.button``;

export const StyledTitle = styled.h1`
    font-family: 'Virgil', sans-serif;
`;
