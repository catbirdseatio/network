import React, { useEffect, useState } from "react";
import axios from "./axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const results = await axios("/posts");
        setPosts(results.data);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <>
      <h1>Hello From React</h1>
      <ul>
        {posts.map(post => <li key={post.pk}><strong>{post.author}</strong> : {post.body}</li>)}
      </ul>
    </>
  );
};

export default App;
