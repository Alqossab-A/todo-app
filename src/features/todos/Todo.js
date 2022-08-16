import { formateDate } from '../../utils/formateDate';

const Todo = ({ todo }) => {
    const { text: todoText, date} = todo;

    return (
        <li>
            {todoText}
            <br />
            {formateDate(date)}
        </li>
    );
};

export default Todo;