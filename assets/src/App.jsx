import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApiProvider from "./contexts/ApiProvider";
import UserProvider from "./contexts/UserContext";
import FlashProvider from "./contexts/FlashProvider";

import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import PrivateRoutes from "./components/PrivateRoutes";
import Redirect from "./components/Redirect";
import FollowingPage from "./pages/FollowingPage";
import AllPostsPage from "./pages/AllPostsPage";
import UserPage from "./pages/UserPage";

const App = () => {
  return (
    <Container fluid className="App vh-100">
      <BrowserRouter>
        <FlashProvider>
          <ApiProvider>
            <UserProvider>
              <Header />
              <Routes>
                <Route path="/" element={<AllPostsPage />} />
                <Route path="/users/:username" element={<UserPage />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="/feed" element={<FollowingPage />} />
                  <Route
                    path="/logout"
                    element={<Redirect url={"/logout"} />}
                  />
                </Route>
                <Route path="/login" element={<Redirect url={"/login"} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </UserProvider>
          </ApiProvider>
        </FlashProvider>
      </BrowserRouter>
    </Container>
  );
};

export default App;
