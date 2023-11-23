import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import PostForm from "../PostForm";
import { useApi } from "../../contexts/ApiProvider";

const PostCard = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [body, setBody] = useState(post.body); 
  const api = useApi();

  const onEditHandler = async (data) => {
    try {
      await api.put(`/posts/${post.pk}`, data);
      setIsEditing(false);
      // reset the state
      setBody(data.body);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header></Card.Header>
      <Card.Body>
        <Card.Title>
          <Link to={`/users/${post.author}`}>{post.author}</Link>
        </Card.Title>
        {isEditing ? (
          <PostForm
            initialData={{ body }}
            onSubmit={onEditHandler}
          />
        ) : (
          <Card.Text>{body}</Card.Text>
        )}
      </Card.Body>
      <Card.Footer className="text-muted">
        {post.created_at}
        {post.is_author && (
          <Card.Link onClick={() => setIsEditing(!isEditing)}>Edit</Card.Link>
        )}
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
