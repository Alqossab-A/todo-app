import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteExtraTodo,
    updateExtraTodo,
} from './extraTodosSlice';

import debounce from 'lodash.debounce';
import {
    CheckWrapper,
    Container,
    StyledCheckbox,
    StyledDelete,
    StyledTextArea,
} from './styles/ExtraTodos.styled';

const ExtraTodos = (props) => {
    const extraTodo = props.extraTodo;
    const { _id, extraText, done } = extraTodo;
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState(extraText);
    const [checked, setChecked] = useState(extraTodo.done);

    useEffect(() => {
        setChecked(done);
    }, [done]);

    const debouncedDispatch = useMemo(
        () =>
            debounce(
                (extraTodoObj) => dispatch(updateExtraTodo(extraTodoObj)),
                750
            ),
        [dispatch]
    );

    const handleChange = (e) => {
        setInputValue(e.target.value);
        let extraTodoObj = {
            extraText: e.target.value,
            done: done,
            _id: _id,
        };
        debouncedDispatch(extraTodoObj);
    };

    const HandleCompletion = () => {
        setChecked(!done);
        let extraTodoObj = {
            extraText: extraText,
            done: !done,
            _id: _id,
        };
        dispatch(deleteExtraTodo(extraTodoObj));
    };

    const HandleDelete = () => {
        let extraTodoObj = {
            extraText: extraText,
            done: done,
            _id: _id,
        };
        dispatch(deleteExtraTodo(extraTodoObj));
    };

    return (
        <Container>
            <CheckWrapper checked={checked}>
                <StyledCheckbox
                    type='checkbox'
                    key={_id}
                    name={`done${_id}`}
                    checked={checked}
                    onChange={HandleCompletion}
                />
            </CheckWrapper>
            <StyledTextArea
                maxLength={33}
                minRows={1}
                type='text'
                id={_id}
                value={inputValue}
                onChange={handleChange}
            />
            <StyledDelete onClick={HandleDelete}>X</StyledDelete>
        </Container>
    );
};

export default ExtraTodos;
