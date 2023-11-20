import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const UserProfileCard = ({ user }) => {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Button>Follow</Button>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default UserProfileCard;
