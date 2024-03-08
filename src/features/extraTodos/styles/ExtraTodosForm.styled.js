import { Field, Form } from 'formik';
import styled from '@emotion/styled';

export const StyledForm = styled(Form)`
    display: flex;
    justify-content: center;
`;

export const StyledField = styled(Field)`
    font-family: 'Virgil', sans-serif;
    font-size: 1rem;
    background: transparent;
    border: none;
    height: 1.5rem;
    opacity: 100%;
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
        height: 1.33rem;
    }
`;

export const StyledButton = styled.button`
    border: none;
    color: green;
    background: transparent;
    font-family: 'Virgil', sans-serif;
    font-size: 1.4rem;

    @media (min-width: 350px) and (max-width: 680px) {
        font-size: 1rem;
    }
`;
