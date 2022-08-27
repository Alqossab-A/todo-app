const Todos = ({ todo }) => {
    const { text } = todo;

    return (
        <li>{text}</li>
    );
};


export default Todos;