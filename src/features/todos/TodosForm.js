import { useDispatch } from 'react-redux';
import { postTodo } from './todosSlice';
import { Formik } from 'formik';
import {
    StyledField,
    StyledForm,
    StyledButton,
} from './styles/TodosForm.styled';

const TodoForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        const todo = {
            text: values.todosForm,
            todoStatus: 'todo',
            completed: false,
        };
        resetForm();

        dispatch(postTodo(todo));
    };

    return (
        <Formik
            initialValues={{
                todosForm: '',
            }}
            onSubmit={handleSubmit}
        >
            <StyledForm>
                <StyledField
                    id='todosForm'
                    name='todosForm'
                    placeholder="Enter Today's Here"
                    maxLength={33}
                />
                <StyledButton type='submit'>
                    <i className='fa fa-plus' aria-hidden='true'></i>
                </StyledButton>
            </StyledForm>
        </Formik>
    );
};

export default TodoForm;
