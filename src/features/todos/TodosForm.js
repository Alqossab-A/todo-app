import { useDispatch } from 'react-redux';
import { postTodo } from './todosSlice';
import { Formik, Field, Form } from 'formik';

const TodoForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        const todo = {
            text: values.todosText,
        };
        console.log('todos:', todo);
        resetForm();

        dispatch(postTodo(todo));
    };

    return (
        <Formik
            initialValues={{
                todosText: '',
            }}
            onSubmit={handleSubmit}
        >
            <Form>
                <label htmlFor='todosText'>Enter Task </label>
                <Field id='todosText' name='todosText' placeholder='Task...' classname='form-control' />
                <button type='submit'>Add</button>
            </Form>
        </Formik>
    );
};

export default TodoForm;
