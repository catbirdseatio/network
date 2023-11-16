import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApiProvider from "./contexts/ApiProvider";

import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Redirect from "./components/Redirect";
import FeedPage from "./pages/FeedPage";
import AllPostsPage from "./pages/AllPostsPage";
import UserPage from "./pages/UserPage";

const App = () => {
  return (
    <Container fluid className="App vh-100">
      <BrowserRouter>
        <ApiProvider>
          <Header />
          <Routes>
            <Route path="/" element={<AllPostsPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/users/:username" element={<UserPage />} />
            <Route path="/login" element={<Redirect url={"/login"} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ApiProvider>
      </BrowserRouter>
    </Container>
  );
};

export default App;
