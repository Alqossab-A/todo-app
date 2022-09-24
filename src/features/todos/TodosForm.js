import { useDispatch } from 'react-redux';
import { postTodo } from './todosSlice';
import { Formik, Field, Form } from 'formik';

const TodoForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        const todo = {
            text: values.todosForm,
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
                <label htmlFor='todosForm'>Enter Todo </label>
                <Field id='todosForm' name='todosForm' placeholder='What to do today?...' classname='form-control' />
                <button type='submit'>Add</button>
            </Form>
        </Formik>
    );
};

export default TodoForm;
