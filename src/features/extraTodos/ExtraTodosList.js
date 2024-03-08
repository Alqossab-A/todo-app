import { useSelector } from 'react-redux';
import React from 'react';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ExtraTodos from './ExtraTodos';
import ExtraTodoForm from './ExtraTodosForm';

const ExtraTodosList = () => {
    const extraTodos = useSelector((state) => state.extraTodos.extraTodosArray);

    const isLoading = useSelector((state) => state.extraTodos.isLoading);
    const errMsg = useSelector((state) => state.extraTodos.errMsg);

    if (isLoading) {
        return <Loading />;
    }

    if (errMsg) {
        return <Error errMsg={errMsg} />;
    }

    if (extraTodos && extraTodos.length >= 0) {
        return (
            <section>
                <div>
                    {extraTodos.map((extraTodo, index) => (
                        <ExtraTodos
                            key={extraTodo._id}
                            extraTodo={extraTodo}
                            index={index}
                        />
                    ))}
                </div>

                <div>
                    {extraTodos.length >= 4 ? null : <ExtraTodoForm />}
                </div>
            </section>
        );
    }

    return <p>Enter a Extratodo</p>;
};

export default ExtraTodosList;
