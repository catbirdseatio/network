import React from "react";
import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const NavButtons = ({ pagination, onNext, onPrevious }) => {
  return (
    <Stack direction="horizontal">
      {pagination.previous && (
        <Button variant="primary" onClick={onPrevious}>
          Previous
        </Button>
      )}
      {pagination.next && (
        <Button variant="primary" onClick={onNext}>
          Next
        </Button>
      )}
    </Stack>
  );
};

export default NavButtons;
