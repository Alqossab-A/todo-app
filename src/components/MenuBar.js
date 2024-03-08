import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logoutUser } from '../features/user/userSlice';
import {
    MenuWrapper,
    LoginSignUpWrapper,
    StyledLogo,
    StyledLogout,
    StyledLogin,
    StyledSignup,
    StyledUsername,
} from './styles/MenuBar.Styled';

const MenuBar = () => {
    const currentUser = useSelector(selectCurrentUser);
    const username = currentUser ? currentUser.username : null;

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    if (!username) {
        return (
            <MenuWrapper>
                <StyledLogo to='/'></StyledLogo>

                <LoginSignUpWrapper>
                    <StyledLogin to='/login'>Login</StyledLogin>
                    <StyledSignup to='/signup'>Sign up</StyledSignup>
                </LoginSignUpWrapper>
            </MenuWrapper>
        );
    } else {
        return (
            <MenuWrapper>
                <StyledLogo to='/'></StyledLogo>

                <LoginSignUpWrapper>
                    <StyledUsername>{username}</StyledUsername>
                    <StyledLogout type='submit' onClick={handleLogout}>
                        Logout
                    </StyledLogout>
                </LoginSignUpWrapper>
            </MenuWrapper>
        );
    }
};

export default MenuBar;
