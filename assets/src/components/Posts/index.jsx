import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Post from "../Post";

const Posts = ({ posts }) => (
  <>
    {posts.map((post) => (
      <Post post={post} key={post.pk}/>
    ))}
  </>
);

export default Posts;
