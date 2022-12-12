import ArchivedSubTodo from './ArchivedSubTodo';
import ArchivedTodo from './ArchivedTodo';

const History = (props) => {
    const history = props.history;

    return history.text ? (
        <ArchivedTodo todo={history} />
    ) : history.subText ? (
        <ArchivedSubTodo subTodo={history} />
    ) : null;
};

export default History;
