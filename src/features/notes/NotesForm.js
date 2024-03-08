import { useDispatch } from 'react-redux';
import { postNote } from './notesSlice';
import { Formik, Field } from 'formik';
import {
    StyledButton,
    StyledTextArea,
    StyledForm,
} from './styles/NotesForms.styled';

const NoteForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        const note = {
            text: values.notesForm,
        };
        resetForm();

        dispatch(postNote(note));
    };

    const handleKeyPress = (e, props) => {
        const lines = e.target.value.split('\n');
        if (e.key === 'Enter' || lines.length >= 22) {
            e.preventDefault();
            props.handleSubmit();
        }
    };

    return (
        <Formik
            initialValues={{
                notesForm: '',
            }}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <StyledForm>
                    <Field
                        maxLength={795}
                        minRows={1}
                        maxRows={22}
                        as={StyledTextArea}
                        id='notesForm'
                        name='notesForm'
                        placeholder='Enter a Note'
                        onKeyDown={(e) => handleKeyPress(e, props)}
                    />
                    <StyledButton type='submit'>+</StyledButton>
                </StyledForm>
            )}
        </Formik>
    );
};

export default NoteForm;
