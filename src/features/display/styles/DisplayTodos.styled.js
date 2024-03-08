import styled from '@emotion/styled';

export const DisplayTodosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 27.5rem;
    height: 14.9rem;
    margin-bottom: 1.6rem;

    @media (min-width: 350px) and (max-width: 680px) {
        height: 19rem;
        margin-bottom: 1.3rem;
    }
`;

export const Title = styled.h1`
    align-self: center;
    font-family: 'Caveat', sans-serif;
    font-weight: 500;
    font-size: 2.3rem;
    margin: 0.7rem 0 1rem 0rem;

    @media (min-width: 350px) and (max-width: 680px) {
        margin: 0.2rem 0 0.6rem 0rem;
        font-size: 2rem;
    }
`;

export const Heading = styled.h2`
    align-self: flex-start;
    font-family: 'Caveat', sans-serif;
    font-weight: 500;
    margin: 0 0 0 2.2rem;
    font-size: 2rem;
    background-color: rgba(0, 0, 255, 0.22);
    width: 4.2rem;

    @media (min-width: 350px) and (max-width: 680px) {
        margin: 0 0 0 4.5rem;
        font-size: 1.65rem;
        width: 3.4rem;
    }
`;
