import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 25rem;
    margin-left: 1.8rem;
    margin-bottom: 0.12rem;

    @media (min-width: 350px) and (max-width: 680px) {
        width: 20rem;
        margin-left: 4.3rem;
        margin-bottom: 0rem;
    }
`;

export const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    resize: none;
    overflow: hidden;
    :focus {
        outline: none;
    }
    font-family: 'Virgil', sans-serif;
    font-size: 1.2rem;
    border: none;
    background: transparent;

    @media (min-width: 350px) and (max-width: 680px) {
        font-size: 1rem;
    }
`;

export const StyledDelete = styled.button`
    background-color: transparent;
    border: none;
    font-family: 'Virgil', sans-serif;
    font-size: 1rem;
    color: red;
    align-self: flex-start;
`;

export const StyledCheckbox = styled.input``;

export const CheckWrapper = styled.label``;
