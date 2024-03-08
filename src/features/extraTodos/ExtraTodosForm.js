import { useDispatch } from 'react-redux';
import { postExtraTodo } from './extraTodosSlice';
import { Formik } from 'formik';
import {
    StyledButton,
    StyledField,
    StyledForm,
} from './styles/ExtraTodosForm.styled';

const ExtraTodoForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        const extraTodo = {
            extraText: values.extraTodosForm,
            done: false,
        };
        resetForm();

        dispatch(postExtraTodo(extraTodo));
    };

    return (
        <Formik
            initialValues={{
                extraTodosForm: '',
            }}
            onSubmit={handleSubmit}
        >
            <StyledForm>
                <StyledField
                    id='extraTodosForm'
                    name='extraTodosForm'
                    placeholder='Enter Monthly Here'
                    maxLength={33}
                />
                <StyledButton type='submit'>
                    <i className='fa fa-plus' aria-hidden='true'></i>
                </StyledButton>
            </StyledForm>
        </Formik>
    );
};

export default ExtraTodoForm;
