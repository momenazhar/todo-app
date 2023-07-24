import React from "react";
import { Routes, Route } from "react-router-dom";
//Import components
import GlobalStyles from "./components/GlobalStyles";
import Nav from "./components/Nav";
import styled from "styled-components";
//Import pages
import Tasks from "./pages/Tasks";
import History from "./pages/History";

import { useTasks, useTaskHistory } from "./states";

function App() {
  const [tasks, setTasks] = useTasks();
  const [history, setHistory] = useTaskHistory();

  return (
    <div>
      <GlobalStyles />
      <Nav />
      <StyledContainer>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Tasks
                tasks={tasks}
                setTasks={setTasks}
                history={history}
                setHistory={setHistory}
              />
            }
          />
          <Route
            path="logs"
            element={
              <History
                history={history}
                setHistory={setHistory}
                tasks={tasks}
                setTasks={setTasks}
              />
            }
          />
        </Routes>
      </StyledContainer>
    </div>
  );
}

const StyledContainer = styled.div`
  background-color: #f5f5f5;
  height: 100vh;
  width: 85%;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  margin-left: 15%;
`;

export default App;
