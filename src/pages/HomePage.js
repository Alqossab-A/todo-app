import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todos/todosSlice";
import { fetchSubTodos } from "../features/subTodos/subTodosSlice";
import { fetchExtraTodos } from "../features/extraTodos/extraTodosSlice";
import { fetchNotes } from "../features/notes/notesSlice";
import {
  Container,
  LeftWrapper,
  RightWrapper,
  WelcomeMsg,
  WelcomeBody,
  Wrapper,
  Card,
  Img,
  LContainer,
  Summary,
  Body1,
  Body2,
  StyledSignup,
} from "./styles/HomePage.styled";
import { selectCurrentUser } from "../features/user/userSlice";
import todolistimg from "../app/assets/imgs/todolist.png";
import notesimg from "../app/assets/imgs/notes.png";

import MenuBar from "../components/MenuBar";
import DisplayTodos from "../features/display/DisplayTodos";
import DisplaySubTodos from "../features/display/DisplaySubTodos";
import DisplayExtraTodos from "../features/display/DisplayExtraTodos";
import DisplayNotes from "../features/display/DisplayNotes";
import Footer from "../components/Footer";

const HomePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const username = currentUser ? currentUser.username : null;

  useEffect(() => {
    if (username !== null) {
      dispatch(fetchTodos());
      dispatch(fetchSubTodos());
      dispatch(fetchExtraTodos());
      dispatch(fetchNotes());
    }
  }, [dispatch, username]);

  return (
    <>
      <MenuBar />
      {username === null ? (
        <LContainer>
          <h2 style={{ color: "red", alignSelf: "center" }}>
            Server under maintenance try offline mode
          </h2>
          <WelcomeMsg>Welcome to Notes</WelcomeMsg>
          <WelcomeBody>
            Notes takes a simple approach to task handling and managing your
            time. Firstly, it doesn't have any timers or deadlines. Notes is
            meant to assist you with your personal life rather than your work
            life.
          </WelcomeBody>
          <Wrapper>
            <Card>
              <Body1>
                You have a list of goals here: 4 daily, 3 weekly, and 4 monthly.
                These can, of course can be carried over to the next day, next
                week, or next month; they are just goals, not due dates.
              </Body1>
              <Img src={todolistimg} alt="todo list"></Img>
            </Card>
            <Card>
              <Img src={notesimg} alt="notes"></Img>
              <Body2>
                The notes here come as blank sheets that you can fill with
                anything that comes to mind for today, tomorrow, next week, or
                whenever you feel like it. I personally use them to jot down
                anything I'm thinking of... these notes belong to Rebecca.
              </Body2>
            </Card>
          </Wrapper>
          <Summary>
            If you feel like this might be useful to you, feel free to give it a
            try. It's completely free of cost, and if you lose your account,
            it's your responsibility isn't that great? 😊 The signup process
            only requires a username and password; no email is needed, so
            there's no account recovery.
          </Summary>
          <StyledSignup href="/signup">sign up</StyledSignup>
        </LContainer>
      ) : (
        <Container>
          <LeftWrapper>
            <DisplayTodos />
            <DisplaySubTodos />
            <DisplayExtraTodos />
          </LeftWrapper>

          <RightWrapper>
            <DisplayNotes />
          </RightWrapper>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default HomePage;
