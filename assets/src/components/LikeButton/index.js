import React from "react";
import Heart from "react-heart";
import Stack from "react-bootstrap/Stack";
import { useUserContext } from "../../contexts/UserContext";

const LikeButton = ({ isLiked, likes, onLike }) => {
  const { user } = useUserContext();

  return (
    <Stack direction="horizontal">
      <Heart
        style={{ width: "1rem", marginRight: ".5rem" }}
        inactiveColor="lightgray"
        isActive={isLiked}
        onClick={() => (user.is_authenticated ? onLike() : null)}
        animationScale={1.25}
      />
      <>{likes}</>
    </Stack>
  );
};

export default LikeButton;
