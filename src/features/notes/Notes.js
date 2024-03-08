import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from './notesSlice';

import debounce from 'lodash.debounce';
import { Container, StyledDelete, StyledTextArea } from './styles/Notes.styled';

const Notes = (props) => {
    const note = props.note;
    const { _id, text } = note;
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState(text);

    const debouncedDispatch = useMemo(
        () => debounce((notesObj) => dispatch(updateNote(notesObj)), 750),
        [dispatch]
    );

    const handleChange = (e) => {
        const lines = e.target.value.split('\n');
        if (lines.length <= 22) {
            setInputValue(e.target.value);
            let notesObj = {
                text: e.target.value,
                _id: _id,
            };
            debouncedDispatch(notesObj);
        }
    };

    const HandleDelete = () => {
        let notesObj = {
            text: text,
            _id: _id,
        };
        dispatch(deleteNote(notesObj));
    };

    return (
        <Container>
            <StyledTextArea
                maxLength={795}
                minRows={1}
                maxRows={22}
                type='text'
                id={_id}
                value={inputValue}
                onChange={handleChange}
            />
            <StyledDelete onClick={HandleDelete}>X</StyledDelete>
        </Container>
    );
};

export default Notes;
