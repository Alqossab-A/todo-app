import ArchivedSubTodo from './ArchivedSubTodo';

const History = (props) => {
    const history = props.history;

    return (
        <>
            <div className='HistoryTodo'>
                {history.filter(history.completed).map((history) => {
                    return <ArchivedSubTodo history={history} />;
                })}
            </div>
            
            <div className='HistorySubTodo'>
                {history.filter(history.done).map((history) => {
                    return <ArchivedSubTodo history={history} />;
                })}
            </div>
        </>
    );
};

export default History;
