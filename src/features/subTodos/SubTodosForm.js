import { useDispatch } from 'react-redux';
import { postSubTodo } from './subTodosSlice';
import { Formik } from 'formik';
import {
    StyledButton,
    StyledField,
    StyledForm,
} from './styles/SubTodosForm.styled';

const SubTodoForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        const todo = {
            subText: values.subTodosForm,
            done: false,
        };
        resetForm();

        dispatch(postSubTodo(todo));
    };

    return (
        <Formik
            initialValues={{
                subTodosForm: '',
            }}
            onSubmit={handleSubmit}
        >
            <StyledForm>
                <StyledField
                    id='subTodosForm'
                    name='subTodosForm'
                    placeholder='Enter Weekly Here'
                    maxLength={33}
                />
                <StyledButton type='submit'>
                    <i className='fa fa-plus' aria-hidden='true'></i>
                </StyledButton>
            </StyledForm>
        </Formik>
    );
};

export default SubTodoForm;
