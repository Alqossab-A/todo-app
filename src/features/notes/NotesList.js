import { useSelector } from 'react-redux';
import React from 'react';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Notes from './Notes';
import NoteForm from './NotesForm';

const NotesList = () => {
    const notes = useSelector((state) => state.notes.notesArray);

    const isLoading = useSelector((state) => state.notes.isLoading);
    const errMsg = useSelector((state) => state.notes.errMsg);

    if (isLoading) {
        return <Loading />;
    }

    if (errMsg) {
        return <Error errMsg={errMsg} />;
    }

    if (notes && notes.length >= 0) {
        return (
            <>
                <div>
                    {notes.map((notes, index) => (
                        <Notes key={notes._id} note={notes} index={index} />
                    ))}
                </div>

                <div>{notes.length >= 1 ? null : <NoteForm />}</div>
            </>
        );
    }

    return <p>Enter a note</p>;
};

export default NotesList;
