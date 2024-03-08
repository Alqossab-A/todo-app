import { Field, Form } from 'formik';
import styled from '@emotion/styled';

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 22rem;
    height: 24rem;
    margin: 2rem;
    background-color: #eae5d3;
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
    opacity: 100%;
`;

export const FieldWrapper = styled.div``;

export const StyledField = styled(Field)`
    width: 50%;
    margin: 0.7rem;
    padding: 0.7rem;
    border: none;
    background-color: rgba(211, 216, 234, 1);
    text-align: center;
    font-family: 'Virgil', sans-serif;
    color: black;
    font-size: 1.3rem;
    ::placeholder {
        color: black;
    }

    :focus::placeholder {
        color: transparent;
    }
`;
export const StyledButton = styled.button`
    margin: 1rem;
    padding: 0.8rem 1.5rem;
    background-color: rgba(3, 138, 255, 0.6);
    font-size: 1.2rem;
    font-family: 'Virgil', sans-serif;
    border: none;
    border-radius: 0.5rem;
`;

export const StyledErr = styled.p`
    color: red;
`;
