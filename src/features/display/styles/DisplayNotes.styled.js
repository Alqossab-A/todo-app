import styled from '@emotion/styled';

export const DisplayNotesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 40rem;
    width: 26.5rem;

    @media (min-width: 350px) and (max-width: 680px) {
        height: 33.2rem;
        width: 22rem;
        margin-bottom: 1.3rem;
    }
`;

export const Title = styled.h1`
    justify-self: flex-start;
    align-self: center;
    font-family: 'Caveat', sans-serif;
    font-weight: 500;
    font-size: 2.3rem;
    margin: 0.7rem 0 0.7rem 0;

    @media (min-width: 350px) and (max-width: 680px) {
        margin: 0.2rem 0 0rem 0rem;
        font-size: 2rem;
    }
`;
