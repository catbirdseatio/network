import React from "react";
import { Stack } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

const NavButtons = ({ pagination, onNext, onPrevious }) => {
  return (
    <Stack direction="horizontal" style={{ display: "flex", justifyContent: "center" }}>
    <Pagination>
      <Pagination.Prev disabled={!pagination.previous} onClick={onPrevious} />
      <Pagination.Next disabled={!pagination.next} onClick={onNext} />
    </Pagination>
    </Stack>
  );
};

export default NavButtons;
