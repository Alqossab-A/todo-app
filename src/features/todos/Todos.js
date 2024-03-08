import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo, updateTodoComplete } from './todosSlice';
import {
    StyledCheckbox,
    StyledDelete,
    StyledTextArea,
    Container,
    CheckWrapper,
} from './styles/Todos.styled';
import debounce from 'lodash.debounce';

const Todos = (props) => {
    const todo = props.todo;
    const { _id, text, completed } = todo;
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState(text);
    const [checked, setChecked] = useState(completed);

    useEffect(() => {
        setChecked(completed);
    }, [completed]);

    const debouncedDispatch = useMemo(
        () => debounce((todoObj) => dispatch(updateTodo(todoObj)), 750),
        [dispatch]
    );

    const handleChange = (e) => {
        setInputValue(e.target.value);
        let todoObj = {
            text: e.target.value,
            completed: checked,
            _id: _id,
        };
        debouncedDispatch(todoObj);
    };

    const HandleCompletion = () => {
        setChecked(!checked);
        let todoObj = {
            text: inputValue,
            completed: !checked,
            _id: _id,
        };
        dispatch(deleteTodo(todoObj));
    };

    const HandleDelete = () => {
        let todoObj = {
            text: inputValue,
            completed: checked,
            _id: _id,
        };
        dispatch(deleteTodo(todoObj));
    };

    return (
        <Container>
            <CheckWrapper checked={checked}>
                <StyledCheckbox
                    type='checkbox'
                    key={_id}
                    name={`completed${_id}`}
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

export default Todos;
