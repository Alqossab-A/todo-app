import ExtraTodosList from '../extraTodos/ExtraTodosList';
import { DisplayExtraTodosWrapper, Title } from './styles/DisplayExtraTodos.styled';

const DisplayExtraTodos = () => {
    return (
        <DisplayExtraTodosWrapper>
            <Title>
                This Month
            </Title>
            <ExtraTodosList />
        </DisplayExtraTodosWrapper>
    );
};

export default DisplayExtraTodos;
