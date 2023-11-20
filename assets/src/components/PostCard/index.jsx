import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => (
<>
<Link to={`/users/${post.author}`}>{post.author}</Link>
    <p>{post.body}</p>
</>
);

export default PostCard;
