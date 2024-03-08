import { useSelector } from 'react-redux';
import React from 'react';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import SubTodos from './SubTodos';
import SubTodoForm from './SubTodosForm';

const SubTodosList = () => {
    const subTodos = useSelector((state) => state.subTodos.subTodosArray);

    const isLoading = useSelector((state) => state.subTodos.isLoading);
    const errMsg = useSelector((state) => state.subTodos.errMsg);

    if (isLoading) {
        return <Loading />;
    }

    if (errMsg) {
        return <Error errMsg={errMsg} />;
    }

    if (subTodos && subTodos.length >= 0) {
        return (
            <section>
                <div>
                    {subTodos.map((subTodo, index) => (
                        <SubTodos
                            key={subTodo._id}
                            subTodo={subTodo}
                            index={index}
                        />
                    ))}
                </div>
                
                <div>
                    {subTodos.length >= 3 ? null : <SubTodoForm />}
                </div>
            </section>
        );
    }

    return <p>Enter a subtodo</p>;
};

export default SubTodosList;
