import styled from '@emotion/styled';

export const DisplaySubTodosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 27.5rem;
    height: 8.1rem;
    margin-bottom: 1.6rem;

    @media (min-width: 350px) and (max-width: 680px) {
        height: 10.7rem;
        margin-bottom: 1.3rem;
    }
`;

export const Title = styled.h2`
    align-self: flex-start;
    font-family: 'Caveat', sans-serif;
    font-weight: 500;
    font-size: 2rem;
    margin: 0 0 0 2.2rem;
    background-color: rgba(255, 0, 0, 0.22);
    width: 7rem;

    @media (min-width: 350px) and (max-width: 680px) {
        margin: 0 0 0 4.5rem;
        font-size: 1.65rem;
        width: 5.8rem;
    }
`;
