import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "./axios";

import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import FeedPage from "./pages/FeedPage";
import AllPostsPage from "./pages/AllPostsPage";
import UserPage from "./pages/UserPage";
import Redirect from "./pages/Redirect";

const App = () => {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AllPostsPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/users/:username" element={<UserPage />} />
          <Route path="/login" element={<Redirect url={'/admin'} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
