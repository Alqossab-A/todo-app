import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/shared/baseUrl";

export const fetchExtraTodos = createAsyncThunk(
  "extraTodos/fetchExtraTodos",
  async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === "offline") {
      return JSON.parse(localStorage.getItem("extraTodos") ?? "[]");
    } else {
      const response = await fetch(baseUrl + "extraTodos", {
        credentials: "include",
      });

      if (!response.ok) {
        return Promise.reject("Unable to fetch, status:" + response.status);
      }

      const data = await response.json();
      return data;
    }
  },
);

export const postExtraTodo = createAsyncThunk(
  "extraTodos/postExtraTodo",
  async (extraTodo, { dispatch }) => {
    if (extraTodo.extraText === "") {
      return Promise.reject("empty input");
    }
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === "offline") {
      dispatch(addExtraTodo(extraTodo));
    } else {
      const response = await fetch(baseUrl + "extraTodos", {
        method: "POST",
        body: JSON.stringify(extraTodo),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        return Promise.reject(response.status);
      }

      const data = await response.json();
      dispatch(addExtraTodo(data));
    }
  },
);

export const deleteExtraTodo = createAsyncThunk(
  "extraTodos/deleteExtraTodo",
  async (extraTodo) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === "offline") {
      return extraTodo;
    } else {
      const response = await fetch(baseUrl + `extraTodos/${extraTodo._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        return Promise.reject(response.status);
      }

      if (response.ok) {
        return { _id: extraTodo._id };
      }
    }
  },
);

export const updateExtraTodo = createAsyncThunk(
  "extraTodos/updateExtraTodo",
  async (extraTodo) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user === "offline") {
      return extraTodo;
    } else {
      const response = await fetch(baseUrl + `extraTodos/${extraTodo._id}`, {
        method: "PUT",
        body: JSON.stringify(extraTodo),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        return Promise.reject(response.status);
      }
    }
  },
);

export const updateExtraTodoDone = createAsyncThunk(
  "extraTodos/updateExtraTodoDone",
  async (extraTodo) => {
    const response = await fetch(baseUrl + `extraTodos/${extraTodo._id}`, {
      method: "PUT",
      body: JSON.stringify(extraTodo),
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
  extraTodosArray: [],
  isLoading: false,
  errMsg: "",
};

const extraTodosSlice = createSlice({
  name: "extraTodos",
  initialState,
  reducers: {
    addExtraTodo: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user === "offline") {
        const newExtraTodo = {
          _id: state.extraTodosArray.length + 1,
          ...action.payload,
        };

        state.extraTodosArray.push(newExtraTodo);
        let localArr = JSON.stringify(state.extraTodosArray);

        localStorage.setItem("extraTodos", localArr);
      } else {
        const newExtraTodo = {
          ...action.payload,
        };
        state.extraTodosArray.push(newExtraTodo);
      }
    },
  },
  extraReducers: {
    [fetchExtraTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchExtraTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = "";
      state.extraTodosArray = action.payload;
    },
    [fetchExtraTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch Failed";
    },
    [postExtraTodo.rejected]: (action) => {
      alert(
        "Your extratodo could not be posted\nError: " +
          (action.error
            ? action.error.message
            : "Please provide a valid input"),
      );
    },
    [deleteExtraTodo.fulfilled]: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user === "offline") {
        let extraTodos = JSON.parse(localStorage.getItem("extraTodos"));

        let filtered = extraTodos.filter(
          (extraTodo) => extraTodo._id !== action.payload._id,
        );
        state.extraTodosArray = filtered;

        let stringArr = JSON.stringify(filtered);
        localStorage.setItem("extraTodos", stringArr);
      } else {
        const deletedExtraTodoId = action.payload._id;

        const updatedExtraTodosArray = state.extraTodosArray.filter(
          (extraTodo) => extraTodo._id !== deletedExtraTodoId,
        );

        state.extraTodosArray = updatedExtraTodosArray;
      }
    },
    [updateExtraTodo.fulfilled]: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user === "offline") {
        let extraTodos = JSON.parse(localStorage.getItem("extraTodos"));

        const newExtraTodos = extraTodos.map((extraTodo) => {
          if (extraTodo._id === action.payload._id) {
            return { ...extraTodo, extraText: action.payload.extraText };
          }
          return extraTodo;
        });

        let result = JSON.stringify(newExtraTodos);
        localStorage.setItem("extraTodos", result);
        state.extraTodosArray = newExtraTodos;
      }
    },
    [updateExtraTodoDone.fulfilled]: (state, action) => {
      const updateExtraTodoID = action.payload._id;

      const updatedExtraTodosArray = state.extraTodosArray.filter(
        (extraTodo) => extraTodo._id !== updateExtraTodoID,
      );

      state.extraTodosArray = updatedExtraTodosArray;
    },
  },
});

export const selectAllExtraTodos = (state) => {
  return state.extraTodos.extraTodosArray;
};

export const extraTodoReducer = extraTodosSlice.reducer;

export const { addExtraTodo, updateExtraTodos } = extraTodosSlice.actions;
