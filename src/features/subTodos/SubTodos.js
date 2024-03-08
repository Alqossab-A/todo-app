import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteSubTodo,
    updateSubTodo,
    updateSubTodoDone,
} from './subTodosSlice';

import debounce from 'lodash.debounce';
import {
    CheckWrapper,
    Container,
    StyledCheckbox,
    StyledDelete,
    StyledTextArea,
} from './styles/SubTodos.styled';

const SubTodos = (props) => {
    const subTodo = props.subTodo;
    const { _id, subText, done } = subTodo;
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState(subText);
    const [checked, setChecked] = useState(subTodo.done);

    useEffect(() => {
        setChecked(done);
    }, [done]);

    const debouncedDispatch = useMemo(
        () =>
            debounce((subTodoObj) => dispatch(updateSubTodo(subTodoObj)), 750),
        [dispatch]
    );

    const handleChange = (e) => {
        setInputValue(e.target.value);
        let subTodoObj = {
            subText: e.target.value,
            done: done,
            _id: _id,
        };
        debouncedDispatch(subTodoObj);
    };

    const HandleCompletion = () => {
        setChecked(!done);
        let subTodoObj = {
            subText: inputValue,
            done: !done,
            _id: _id,
        };
        dispatch(deleteSubTodo(subTodoObj));
    };

    const HandleDelete = () => {
        let subTodoObj = {
            subText: inputValue,
            done: done,
            _id: _id,
        };
        dispatch(deleteSubTodo(subTodoObj));
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
            <StyledDelete onClick={HandleDelete}>x</StyledDelete>
        </Container>
    );
};

export default SubTodos;
