import styled from '@emotion/styled';
import linedPaper from '../../app/assets/svgs/linedpaper.svg';
import blueLinedPaper from '../../app/assets/svgs/blueLinedPaper.svg';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 1rem 0rem;
    padding: 1rem 0rem;
`;

export const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem;
    height: 39rem;
    width: 28rem;
    background-color: #eae5d3;
    background-repeat: no-repeat;
    background-size: 93%;
    background-position: center bottom 1.2rem;
    background-image: url(${linedPaper});
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
    opacity: 100%;

    @media (min-width: 350px) and (max-width: 680px) {
        height: 31.2rem;
        width: 22.4rem;
    }
`;

export const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem;
    height: 39rem;
    width: 28rem;
    background-color: #eae5d3;
    background-repeat: no-repeat;
    background-size: 93%;
    background-position: center bottom 1.2rem;
    background-image: url(${blueLinedPaper});
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
    opacity: 100%;

    @media (min-width: 350px) and (max-width: 680px) {
        height: 31.2rem;
        width: 22.4rem;
    }
`;

// Landing

export const LContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export const Card = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export const WelcomeMsg = styled.h1`
    font-family: 'Caveat', sans-serif;
    font-size: 3rem;
    text-align: center;
`;

export const WelcomeBody = styled.p`
    font-family: 'Virgil', sans-serif;
    font-size: 1.2rem;
    text-align: center;
    align-self: center;
    width: 85%;
`;

export const Body1 = styled.p`
    font-family: 'Virgil', sans-serif;
    font-size: 1.2rem;
    align-self: center;

    width: 20rem;
    height: 10rem;
    margin: 1rem;
    padding: 2rem 2rem;
    background-color: rgba(255, 192, 203, 0.6);
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
`;

export const Body2 = styled.p`
    font-family: 'Virgil', sans-serif;
    font-size: 1.2rem;
    align-self: center;

    width: 20rem;
    height: 12rem;
    margin: 1rem;
    padding: 2rem 2rem;
    background-color: rgba(255, 255, 0, 0.6);
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
`;

export const Summary = styled.p`
    font-family: 'Virgil', sans-serif;
    font-size: 1.2rem;
    align-self: center;
    width: 85%;
`;

export const Img = styled.img`
    height: 33rem;
    margin: 0.5rem 0 1rem 0;
`;

export const StyledSignup = styled.a`
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    align-self: center;
    background-color: rgba(121,151,167, 0.5);
    font-size: 1.2rem;
    font-family: 'Virgil', sans-serif;
    text-decoration: none;
    color: black;
    border-radius: 0.5rem;
    border: solid 0.15rem;
`;
