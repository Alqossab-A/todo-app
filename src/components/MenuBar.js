import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  logoutUser,
  offlineUser,
} from "../features/user/userSlice";
import {
  MenuWrapper,
  LoginSignUpWrapper,
  StyledLogo,
  StyledLogin,
  StyledSignup,
  StyledLogout,
  StyledOffline,
  StyledUsername,
} from "./styles/MenuBar.Styled";

const MenuBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const username =
    currentUser === "offline"
      ? "offline"
      : currentUser
        ? currentUser.username
        : null;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleOffline = () => {
    localStorage.setItem("todos", "[]");
    localStorage.setItem("subTodos", "[]");
    localStorage.setItem("extraTodos", "[]");
    localStorage.setItem("notes", "[]");
    dispatch(offlineUser());
  };

  if (!username) {
    return (
      <MenuWrapper>
        <StyledLogo to="/"></StyledLogo>

        <LoginSignUpWrapper>
          <StyledOffline type="submit" onClick={handleOffline}>
            offline mode
          </StyledOffline>
          {/*
          <StyledLogin to="/login">Login</StyledLogin>
          <StyledSignup to="/signup">Sign up</StyledSignup>
          */}
        </LoginSignUpWrapper>
      </MenuWrapper>
    );
  } else {
    return (
      <MenuWrapper>
        <StyledLogo to="/"></StyledLogo>

        <LoginSignUpWrapper>
          <StyledUsername>{username}</StyledUsername>
          <StyledLogout type="submit" onClick={handleLogout}>
            Logout
          </StyledLogout>
        </LoginSignUpWrapper>
      </MenuWrapper>
    );
  }
};

export default MenuBar;
