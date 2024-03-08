import styled from '@emotion/styled';

export const Container = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem 1rem;
`;

export const StyledList = styled.div`
    display: flex;
    flex-direction: row;
    height: 6rem;
    justify-content: space-evenly;

    @media (min-width: 350px) and (max-width: 481px) {
        flex-direction: column;
    }
`;

export const StyledLink = styled.a`
    color: black;
    margin: 0.5rem 1.3rem;
`;

export const StyledTitle = styled.h3`
    font-family: 'Caveat', sans-serif;
    font-size: 1.5rem;
`;
