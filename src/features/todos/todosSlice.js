import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/shared/baseUrl";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user === "offline") {
    return JSON.parse(localStorage.getItem("todos") ?? "[]");
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
    if (todo.text === "") {
      return Promise.reject("empty input");
    }

    const user = JSON.parse(localStorage.getItem("user"));

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
  const user = JSON.parse(localStorage.getItem("user"));

  if (user === "offline") {
    return todo;
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
  const user = JSON.parse(localStorage.getItem("user"));

  if (user === "offline") {
    return todo;
  } else {
    const response = await fetch(baseUrl + `todos/${todo._id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject(response.status);
    }
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
      const user = JSON.parse(localStorage.getItem("user"));

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
      const user = JSON.parse(localStorage.getItem("user"));

      if (user === "offline") {
        let todos = JSON.parse(localStorage.getItem("todos"));

        let filtered = todos.filter((todo) => todo._id !== action.payload._id);
        state.todosArray = filtered;

        let stringArr = JSON.stringify(filtered);
        localStorage.setItem("todos", stringArr);
      } else {
        const deletedTodoId = action.payload._id;
        const updatedTodosArray = state.todosArray.filter(
          (todo) => todo._id !== deletedTodoId,
        );

        state.todosArray = updatedTodosArray;
      }
    },
    [updateTodo.fulfilled]: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user === "offline") {
        let todos = JSON.parse(localStorage.getItem("todos"));

        console.log("action", action.payload);
        const newTodos = todos.map((todo) => {
          if (todo._id === action.payload._id) {
            return { ...todo, text: action.payload.text };
          }
          return todo;
        });

        let result = JSON.stringify(newTodos);
        localStorage.setItem("todos", result);
        state.todosArray = newTodos;
      }
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
