import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import PostCard from "../PostCard";
import Stack from "react-bootstrap/Stack";
import { Container } from "react-bootstrap";

const Posts = ({ posts }) => (
  <Container fluid style={{ minHeight: "100vh" }}>
    {posts.length == 0 ? (
      <p>There are no posts.</p>
    ) : (
      posts.map((post) => <PostCard post={post} key={post.pk} />)
    )}
  </Container>
);

export default Posts;
