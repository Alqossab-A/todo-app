import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/shared/baseUrl";

export const fetchExtraTodos = createAsyncThunk(
  "extraTodos/fetchExtraTodos",
  async () => {
    // item is in double quotes when retrieved ""item""
    const user = localStorage.getItem("user").replace(/['"]+/g, "");
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
  },
);

export const updateExtraTodo = createAsyncThunk(
  "extraTodos/updateExtraTodo",
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
  },
);

export const deleteExtraTodo = createAsyncThunk(
  "extraTodos/deleteExtraTodo",
  async (extraTodo) => {
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
      const newExtraTodo = {
        ...action.payload,
      };
      state.extraTodosArray.push(newExtraTodo);
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
      const deletedExtraTodoId = action.payload._id;

      const updatedExtraTodosArray = state.extraTodosArray.filter(
        (extraTodo) => extraTodo._id !== deletedExtraTodoId,
      );

      state.extraTodosArray = updatedExtraTodosArray;
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
