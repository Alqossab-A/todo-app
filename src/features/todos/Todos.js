const Todo = ({ todo }) => {
    const { text: todoText,} = todo;

    return (
        <p>
            {todoText}
            <br />
        </p>
    );
};

export default Todo;