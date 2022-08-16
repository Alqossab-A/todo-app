import { useDispatch } from 'react-redux';
import { postTodo } from './todosSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';

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
        <>
            <Formik
                initialValues={{
                    todoText: '',
                }}

                onSubmit={handleSubmit}
            >
                <Field name='text'>
                    <input htmlfor='text'
                </Field>
            </Formik>
        </>
    );
};
