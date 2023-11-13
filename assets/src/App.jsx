import React, { useEffect, useState } from "react";
import axios from "./axios";

import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Body from "./components/Body"

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios("/posts");
        setData(data);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <Container fluid className="App">
      <Header />
      <Body>
        <Posts posts={data.results}/>
      </Body>
    </Container>
  );
};

export default App;
