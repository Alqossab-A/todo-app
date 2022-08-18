import { useDispatch } from 'react-redux';
import { postTodo } from './todosSlice';
import { Formik, Field, Form } from 'formik';

const TodoForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const todo = {
            text: values.todoText,
        };
        console.log('todos:', todo);

        dispatch(postTodo(todo));
    };

    return (
        <Formik
            initialValues={{
                todoText: '',
            }}
            onSubmit={handleSubmit}
        >
            <Form>
                <label htmlFor='todoText'>Enter Task</label>
                <Field id='todoText' name='todoText' placeholder='Task...' />
                <button type='submit'>Add</button>
            </Form>
        </Formik>
    );
};

export default TodoForm;
