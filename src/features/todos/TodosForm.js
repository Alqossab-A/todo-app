import { useDispatch } from 'react-redux';
import { postTodo } from './todosSlice';
import { Formik, Field, Form } from 'formik';

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
            <Form>
                <label htmlFor='todosForm' className='formLabel'>Must be done</label>
                <Field
                    id='todosForm'
                    name='todosForm'
                    placeholder='What must be done today?'
                    className='form-control'
                />
                <button type='submit'>Add</button>
            </Form>
        </Formik>
    );
};

export default TodoForm;
