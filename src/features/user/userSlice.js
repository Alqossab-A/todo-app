import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../app/shared/baseUrl";

export const checkLogin = createAsyncThunk("users/checkLogin", async () => {
  try {
    const response = await fetch(baseUrl + "users/checkLogin", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const offlineUser = localStorage.getItem("user");

    if (offlineUser) {
      return JSON.parse(offlineUser);
    } else {
      return Promise.reject(error.message);
    }
  }
});

export const postLogin = createAsyncThunk("users/postLogin", async (login) => {
  if (login.text === "") {
    return Promise.reject("empty input");
  }

  const response = await fetch(baseUrl + "users/login", {
    method: "POST",
    body: JSON.stringify(login),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    return Promise.reject(response.status);
  }

  const data = await response.json();
  return data;
});

export const logoutUser = createAsyncThunk("users/logout", async () => {
  if (!localStorage.getItem("user") === "offline") {
    const response = await fetch(baseUrl + "users/logout", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject(response.status);
    }

    return response.status;
  }

  localStorage.removeItem("user");
});

export const offlineUser = createAsyncThunk("users/offline", async () => {
  localStorage.setItem("user", JSON.stringify("offline"));
  return "offline";
});

export const postSignUp = createAsyncThunk(
  "users/postSignup",
  async (signup) => {
    if (signup.text === "") {
      return Promise.reject("empty input");
    }

    const response = await fetch(baseUrl + "users/signup", {
      method: "POST",
      body: JSON.stringify(signup),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return Promise.reject(response.status);
    }
  },
);

const initialState = {
  currentUser: null,
  signedUp: false,
  isLoading: false,
  errMsg: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      return { ...state, currentUser: action.payload };
    },
    logoutUser: (state) => {
      return { ...state, currentUser: null };
    },
    setSignedUp: (state, action) => {
      return { ...state, signedUp: action.payload };
    },
  },
  extraReducers: {
    [postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [postLogin.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    [postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      let errorMessage =
        action.error.message !== "401"
          ? action.error.message
          : "Username or Password Incorrect";
      state.error = errorMessage;
    },
    [postSignUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.signedUp = true;
    },
    [postSignUp.pending]: (state, action) => {
      state.isLoading = false;
    },
    [postSignUp.rejected]: (state, action) => {
      state.isLoading = false;
      let errorMessage =
        action.error.message !== "401"
          ? action.error.message
          : "Username or Password Incorrect";
      state.error = errorMessage;
    },
    [checkLogin.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [checkLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [checkLogin.rejected]: (state) => {
      state.currentUser = null;
      state.isLoading = false;
    },
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state) => {
      state.currentUser = null;
      state.isLoading = false;
    },
    [offlineUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;

export const selectCurrentUser = (state) => {
  if (state.currentUser === "offline") {
    return state.currentUser;
  }

  return state.user.currentUser;
};

export const { setSignedUp } = userSlice.actions;
export default userSlice.reducer;
