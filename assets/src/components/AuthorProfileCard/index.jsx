import React, { useState } from "react";

import { useUserContext } from "../../contexts/UserContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const AuthorProfileCard = ({ author }) => {
  const { user } = useUserContext();
  const [followers, setFollowers] = useState(author.followers);
  const [isFollowing, setIsFollowing] = useState(author.is_following);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowers(isFollowing ? isFollowing - 1 : isFollowing + 1);
  };

  return (
    <Card className="my-3">
      <Card.Header></Card.Header>
      <Card.Body>
        <Card.Title className="text-center">{author.username}</Card.Title>
        <Stack direction="horizontal" gap={3}>
          <p>Followers: {followers}</p>
          <p className="ms-auto">Following: {author.following}</p>
        </Stack>
        <div className="d-grid gap-2">
          {user.is_authenticated && (
            <Button
              onClick={handleFollow}
              className={`btn btn-${isFollowing ? "danger" : "primary"}`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default AuthorProfileCard;
