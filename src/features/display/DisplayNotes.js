import NotesList from '../notes/NotesList';
import { DisplayNotesWrapper, Title } from './styles/DisplayNotes.styled';

const DisplayExtraTodos = () => {
    return (
        <>
            <Title>Notes</Title>
            <DisplayNotesWrapper>
                <NotesList />
            </DisplayNotesWrapper>
        </>
    );
};

export default DisplayExtraTodos;
