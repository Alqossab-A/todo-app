import ArchivedSubTodo from './ArchivedSubTodo';
import ArchivedTodo from './ArchivedTodo';

const History = (props) => {
    const history = props.history;

    // if (history.text) {
    //     return <ArchivedTodo todo={history} />;
    // } else if (history.subText) {
    //     return <ArchivedSubTodo subTodo={history} />;
    // } else {
    //     return null;
    // }

    return history.text ? (
        <ArchivedTodo todo={history} />
    ) : history.subText ? (
        <ArchivedSubTodo subTodo={history} />
    ) : null;
};

export default History;
