import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    @media (min-width: 350px) and (max-width: 680px) {
        margin-left: 0.6rem;
        margin-bottom: 0rem;
    }
`;

export const StyledTextArea = styled(TextareaAutosize)`
    margin-bottom: 1.5rem;
    width: 86.5%;
    resize: none;
    overflow: hidden;
    font-family: 'Virgil', sans-serif;
    font-size: 1.2rem;
    border: none;
    background: transparent;
    :focus {
        outline: none;
    }

    @media (min-width: 350px) and (max-width: 680px) {
        font-size: 1rem;
    }
`;

export const StyledDelete = styled.button`
    background-color: transparent;
    border: none;
    font-family: 'Virgil', sans-serif;
    font-size: 1.3rem;
    color: red;
    align-self: flex-start;
`;
