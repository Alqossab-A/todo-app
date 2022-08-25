const Todos = ({ todo }) => {
    const { text: todoText,} = todo;
    
    return (
        <li>
            {todoText}
        </li>
    );
};


export default Todos;