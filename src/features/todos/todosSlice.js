import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/shared/baseUrl";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  // item is in double quotes when retrieved ""item""
  const user = localStorage.getItem("user").replace(/['"]+/g, "");

  if (user === "offline") {
    return JSON.parse(localStorage.getItem("todos"));
  } else {
    const response = await fetch(baseUrl + "todos", {
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject("Unable to fetch, status:" + response.status);
    }

    const data = await response.json();
    return data;
  }
});

export const postTodo = createAsyncThunk(
  "todos/postTodo",
  async (todo, { dispatch }) => {
    const user = localStorage.getItem("user").replace(/['"]+/g, "");

    if (todo.text === "") {
      return Promise.reject("empty input");
    }

    if (user === "offline") {
      dispatch(addTodo(todo));
    } else {
      const response = await fetch(baseUrl + "todos", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        return Promise.reject(response.status);
      }

      const data = await response.json();
      dispatch(addTodo(data));
    }
  },
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (todo) => {
  const user = localStorage.getItem("user").replace(/['"]+/g, "");

  if (user === "offline") {
    return { _id: todo._id };
  } else {
    const response = await fetch(baseUrl + `todos/${todo._id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject(response.status);
    }

    if (response.ok) {
      return { _id: todo._id };
    }
  }
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  const response = await fetch(baseUrl + `todos/${todo._id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    return Promise.reject(response.status);
  }
});

export const updateTodoComplete = createAsyncThunk(
  "todos/updateTodoComplete",
  async (todo) => {
    const response = await fetch(baseUrl + `todos/${todo._id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject(response.status);
    }

    const data = await response.json();
    return data;
  },
);

const initialState = {
  todosArray: [],
  isLoading: false,
  errMsg: "",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const user = localStorage.getItem("user").replace(/['"]+/g, "");

      if (user === "offline") {
        const newTodo = {
          _id: state.todosArray.length + 1,
          ...action.payload,
        };
        state.todosArray.push(newTodo);
        let localArr = JSON.stringify(state.todosArray);
        localStorage.setItem("todos", localArr);
      } else {
        const newTodo = {
          ...action.payload,
        };
        state.todosArray.push(newTodo);
      }
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = "";
      state.todosArray = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch Failed";
    },
    [postTodo.rejected]: (action) => {
      alert(
        "Your todo could not be posted\nError: " +
          (action.error
            ? action.error.message
            : "Please provide a valid input"),
      );
    },
    [deleteTodo.fulfilled]: (state, action) => {
      const deletedTodoId = action.payload._id;
      const updatedTodosArray = state.todosArray.filter(
        (todo) => todo._id !== deletedTodoId,
      );

      state.todosArray = updatedTodosArray;
    },

    [updateTodoComplete.fulfilled]: (state, action) => {
      const updateTodoCompleteID = action.payload._id;

      const updatedTodosArray = state.todosArray.filter(
        (todo) => todo._id !== updateTodoCompleteID,
      );

      state.todosArray = updatedTodosArray;
    },
  },
});

export const selectAllTodos = (state) => {
  return state.todos.todosArray;
};

export const todoReducer = todosSlice.reducer;

export const { addTodo, updateTodos } = todosSlice.actions;
