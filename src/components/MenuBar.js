import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logoutUser, offlineUser } from "../features/user/userSlice";
import {
  MenuWrapper,
  LoginSignUpWrapper,
  StyledLogo,
  StyledLogout,
  StyledUsername,
} from "./styles/MenuBar.Styled";

const MenuBar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const username = currentUser ? currentUser.username : null;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleOffline = () => {
    dispatch(offlineUser());
  };

  if (!username) {
    return (
      <MenuWrapper>
        <StyledLogo to="/"></StyledLogo>

        <LoginSignUpWrapper>
          <button type="submit" onClick={handleOffline}>
            offline mode
          </button>
          {/* 
            <StyledLogin to='/login'>Login</StyledLogin>
            <StyledSignup to='/signup'>Sign up</StyledSignup>
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
