import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/shared/baseUrl";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user === "offline") {
    return JSON.parse(localStorage.getItem("notes") ?? "[]");
  } else {
    const response = await fetch(baseUrl + "notes", {
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject("Unable to fetch, status:" + response.status);
    }

    const data = await response.json();
    return data;
  }
});

export const postNote = createAsyncThunk(
  "notes/postNote",
  async (note, { dispatch }) => {
    if (note.text === "") {
      return Promise.reject("empty input");
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user === "offline") {
      dispatch(addNote(note));
    } else {
      const response = await fetch(baseUrl + "notes", {
        method: "POST",
        body: JSON.stringify(note),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        return Promise.reject(response.status);
      }

      const data = await response.json();
      dispatch(addNote(data));
    }
  },
);

export const updateNote = createAsyncThunk("notes/updateNote", async (note) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user === "offline") {
    return note;
  } else {
    const response = await fetch(baseUrl + `notes/${note._id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject(response.status);
    }
  }
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (note) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user === "offline") {
    return note;
  } else {
    const response = await fetch(baseUrl + `notes/${note._id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject(response.status);
    }

    if (response.ok) {
      return { _id: note._id };
    }
  }
});

const initialState = {
  notesArray: [],
  isLoading: false,
  errMsg: "",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user === "offline") {
        const newNote = {
          _id: state.notesArray.length + 1,
          ...action.payload,
        };

        state.notesArray.push(newNote);
        let localArr = JSON.stringify(state.notesArray);

        localStorage.setItem("notes", localArr);
      } else {
        const newNote = {
          ...action.payload,
        };
        state.notesArray.push(newNote);
      }
    },
  },
  extraReducers: {
    [fetchNotes.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchNotes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMsg = "";
      state.notesArray = action.payload;
    },
    [fetchNotes.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMsg = action.error ? action.error.message : "Fetch Failed";
    },
    [postNote.rejected]: (action) => {
      alert(
        "Your note could not be posted\nError: " +
          (action.error
            ? action.error.message
            : "Please provide a valid input"),
      );
    },
    [deleteNote.fulfilled]: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user === "offline") {
        let notes = JSON.parse(localStorage.getItem("notes"));

        let filtered = notes.filter((note) => note._id !== action.payload._id);
        state.notesArray = filtered;

        let stringArr = JSON.stringify(filtered);
        localStorage.setItem("notes", stringArr);
      } else {
        const deletedNoteId = action.payload._id;

        const updatedNotesArray = state.notesArray.filter(
          (note) => note._id !== deletedNoteId,
        );

        state.notesArray = updatedNotesArray;
      }
    },
    [updateNote.fulfilled]: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user === "offline") {
        let notes = JSON.parse(localStorage.getItem("notes"));

        const newNotes = notes.map((note) => {
          if (note._id === action.payload._id) {
            return { ...note, text: action.payload.text };
          }
          return note;
        });

        let result = JSON.stringify(newNotes);
        localStorage.setItem("notes", result);
        state.notesArray = newNotes;
      }
    },
  },
});

export const selectAllNotes = (state) => {
  return state.notes.notesArray;
};

export const noteReducer = notesSlice.reducer;

export const { addNote, updateNotes } = notesSlice.actions;
