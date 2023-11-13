import React, { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router";

const Redirect = ({ url }) => {
  
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <>
      <Spinner />
    </>
  );
};

export default Redirect;