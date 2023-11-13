import React from "react";

const Post = ({ post }) => (
<>
    <h3>{post.author}</h3>
    <p>{post.body}</p>
</>
);

export default Post;
