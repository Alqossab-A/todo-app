import { Form } from 'formik';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

export const StyledForm = styled(Form)`
    display: flex;
    justify-content: flex-end;
`;

export const StyledTextArea = styled(TextareaAutosize)`
    width: 23rem;
    font-family: 'Virgil', sans-serif;
    font-size: 1.2rem;
    margin-left: 1.8rem;
    align-self: center;
    background: transparent;
    border: none;
    resize: none;
    height: 1.5rem;
    opacity: 100%;
    overflow: hidden;
    :focus {
        outline: none;
    }
    :focus::placeholder {
        color: transparent;
    }
    ::placeholder {
        color: black;
    }

    @media (min-width: 350px) and (max-width: 680px) {
        font-size: 1rem;
    }
`;

export const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    font-family: 'Virgil', sans-serif;
    font-size: 3rem;
    color: green;

    @media (min-width: 350px) and (max-width: 680px) {
        font-size: 2rem;
    }
`;
