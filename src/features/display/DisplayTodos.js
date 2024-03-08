import TodosList from '../todos/TodosList';
import moment from 'moment/moment';
import { DisplayTodosWrapper, Title, Heading } from './styles/DisplayTodos.styled';

const DisplayTodos = () => {
    const todaysDate = moment().format("dddd, MMM Do");

    return (
        <DisplayTodosWrapper>
            <Title>
                {todaysDate}
            </Title>
            <Heading>Today</Heading>
            <TodosList />
        </DisplayTodosWrapper>
    );
};

export default DisplayTodos;
