import styled from '@emotion/styled';

export const DisplayExtraTodosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 27.5rem;
    margin-bottom: 1.6rem;

    @media (min-width: 350px) and (max-width: 680px) {
        height: 16rem;
        margin-bottom: 1rem;
    }
`;

export const Title = styled.h2`
    align-self: flex-start;
    font-family: 'Caveat', sans-serif;
    font-weight: 500;
    font-size: 2rem;
    margin: 0 0 0 2.2rem;
    background-color: rgba(0, 255, 0, 0.22);
    width: 8.5rem;

    @media (min-width: 350px) and (max-width: 680px) {
        margin: 0 0 0 4.5rem;
        font-size: 1.65rem;
        width: 7rem;
    }
`;
