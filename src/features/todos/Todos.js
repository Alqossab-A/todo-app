const Todos = ({ todo }) => {
    const { text } = todo;
    console.log(todo);
    return (
        <li>{text}</li>
    );
};


export default Todos;