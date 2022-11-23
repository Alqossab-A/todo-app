import { useDispatch } from 'react-redux';
import { postSubTodo } from './todosSlice';
import { Formik, Field, Form } from 'formik';

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
            <Form>
                <label htmlFor='subTodosForm'>Enter SubTodo </label>
                <Field
                    id='subTodosForm'
                    name='subTodosForm'
                    placeholder='Sub Todos for today..'
                    className='form-control'
                />
                <button type='submit'>Add</button>
            </Form>
        </Formik>
    );
};

export default SubTodoForm;
