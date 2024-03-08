import SubTodosList from '../subTodos/SubTodosList';
import { DisplaySubTodosWrapper, Title } from './styles/DisplaySubTodos.styled';

const DisplaySubTodos = () => {
    return (
        <DisplaySubTodosWrapper>
            <Title>
                This week 
            </Title>
            <SubTodosList />
        </DisplaySubTodosWrapper>
    );
};

export default DisplaySubTodos;
