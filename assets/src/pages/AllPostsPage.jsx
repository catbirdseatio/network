import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

import useDataApi from "../hooks/useDataApi";
import Body from "../components/Body";
import Posts from "../components/Posts";
import NavButtons from "../components/NavButtons";

const AllPostsPage = () => {
  const [{ data, isLoading, isError }, setUrl] = useDataApi("/posts", {
    results: [],
  });
  const { results, next, previous } = data;
  const pagination = { next, previous };

  const nextButtonHandler = () => {
    setUrl(pagination.next);
  };
  const previousButtonHandler = () => {
    setUrl(pagination.previous);
  };

  return (
    <Body>
      <h2>All Posts</h2>
      {isError && <p className="danger">{isError}</p>}
      {isLoading ? <Spinner /> : <Posts posts={results} />}
      <NavButtons
        pagination={pagination}
        onNext={nextButtonHandler}
        onPrevious={previousButtonHandler}
      />
    </Body>
  );
};

export default AllPostsPage;
