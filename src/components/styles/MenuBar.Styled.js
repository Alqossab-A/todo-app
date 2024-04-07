import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import logo from "../../app/assets/svgs/LeeGoGoNotes.svg";

export const StyledLogo = styled(Link)`
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-size: 10rem;
  margin: 2rem 2rem;
  padding: 3rem 2rem 0 22rem;

  @media (min-width: 350px) and (max-width: 680px) {
    margin: 0 0 0 0.5rem;
    padding: 3rem 2rem 0 8rem;
  }
`;

export const StyledLogin = styled(Link)`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-family: "Virgil", sans-serif;
  text-decoration: none;
  color: black;
`;

export const StyledSignup = styled(Link)`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(121, 151, 167, 0.2);
  font-size: 1.2rem;
  font-family: "Virgil", sans-serif;
  text-decoration: none;
  color: black;
  border-radius: 0.5rem;
  border: solid 0rem;
`;

export const StyledOffline = styled.button`
  margin: 0.5rem;
  padding: 0.6rem 1rem;
  background-color: rgba(121, 151, 167, 0.5);
  font-size: 1.2rem;
  font-family: "Virgil", sans-serif;
  text-decoration: none;
  color: black;
  border-radius: 0.5rem;
  border: solid 0rem;
`;

export const LoginSignUpWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 0rem;
`;

export const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 350px) and (max-width: 680px) {
    justify-content: space-between;
  }
`;

export const StyledLogout = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-family: "Virgil", sans-serif;
  font-size: 1rem;
  background-color: rgba(121, 151, 167, 0.5);
`;

export const StyledUsername = styled.label`
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-family: "Virgil", sans-serif;
  font-size: 1.2rem;

  @media (min-width: 350px) and (max-width: 680px) {
    padding: 0.5rem;
  }
`;
