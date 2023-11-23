import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useApi } from "../../contexts/ApiProvider";
import { useUserContext } from "../../contexts/UserContext";
import { Container } from "react-bootstrap";

const AuthorProfileCard = ({ author }) => {
  const [isFollowing, setIsFollowing] = useState(author.is_following);
  const [followersCount, setFollowersCount] = useState(author.followers);
  const api = useApi();
  const { user } = useUserContext();

  const handleFollow = async () => {
    const url = `/users/${author.username}/follow`;

    // Optimistic update
    setIsFollowing(!isFollowing);
    setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);

    // Make API request
    try {
      if (isFollowing) {
        // Unfollow: DELETE request
        await api.delete(url);
      } else {
        // Follow: POST request
        await api.put(url);
      }
      // Successful server response, no need to do anything
    } catch (error) {
      // Handle error by reverting the optimistic update
      setIsFollowing(!isFollowing);
      setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
      console.error("Error handling follow/unfollow:", error.message);
    }
  };

  return (
    <Container fluid>
      <Card className="my-2">
        <Card.Header>{author.username}</Card.Header>
        <Card.Body>
          <Stack direction="horizontal" gap={3}>
            <p>Followers: {followersCount}</p>
            <p>Following: {author.following}</p>
          </Stack>
          {user.is_authenticated && user.pk !== author.pk && (
            <Button
              variant={isFollowing ? "danger" : "primary"}
              onClick={handleFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthorProfileCard;
