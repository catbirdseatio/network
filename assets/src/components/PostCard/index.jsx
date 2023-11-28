import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useApi } from "../../contexts/ApiProvider";
import { useFlash } from "../../contexts/FlashProvider";
import LikeButton from "../LikeButton";
import PostForm from "../PostForm";
import PostDate from "../PostDate";

const PostCard = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [body, setBody] = useState(post.body);
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [likes, setLikes] = useState(post.like_count);
  const api = useApi();
  const flash = useFlash();

  const onEditHandler = async (data) => {
    try {
      await api.put(`/posts/${post.pk}`, data);
      setIsEditing(false);
      flash("The post has been updated.", "success")
      // reset the state
      setBody(data.body);
    } catch (error) {
      flash(error.message, "danger");
    }
  };

  const onLikeHandler = async () => {
    const url = `/posts/${post.pk}/like`;
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);

    try {
      if (isLiked) {
        await api.delete(url);
      } else {
        await api.put(url);
      }
    } catch (error) {
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
      flash("Error handling like/unlike:", error.message);
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
          <PostForm initialData={{ body }} onSubmit={onEditHandler} />
        ) : (
          <Card.Text>{body}</Card.Text>
        )}
      </Card.Body>
      <Card.Footer className="text-muted">
        <Stack>
          <LikeButton isLiked={isLiked} likes={likes} onLike={onLikeHandler} />
          <PostDate date={post.created_at} />
          {post.is_author && (
            <Card.Link onClick={() => setIsEditing(!isEditing)}>Edit</Card.Link>
          )}
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
