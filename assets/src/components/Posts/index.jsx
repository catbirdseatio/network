import React from "react";

const Posts = ({ posts }) => {
  return (
    <>
      {posts ? (
        <ul>
          {posts.map((post) => (
            <li key={post.pk}>
              <strong>{post.author}</strong>: {post.body}
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no posts.</p>
      )}
    </>
  );
};

export default Posts;
