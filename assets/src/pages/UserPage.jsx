import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Spinner from "react-bootstrap/Spinner";

import useDataApi from "../hooks/useDataApi";
import Body from "../components/Body";
import Posts from "../components/Posts";
import NavButtons from "../components/NavButtons";


const UserPage = () => {
  {
    const { username } = useParams();
    const [{ data, isLoading, isError }, setUrl] = useDataApi(`/posts/?author=&author_username=${username}`, {
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
        <h2>{username}</h2>
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
}

export default UserPage