import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Spinner from "react-bootstrap/Spinner";

import useDataApi from "../hooks/useDataApi";
import Body from "../components/Body";
import Posts from "../components/Posts";
import NavButtons from "../components/NavButtons";
import AuthorProfileCard from "../components/AuthorProfileCard";


const UserPage = () => {
  { 

    const { username } = useParams();

    const [{ data, isLoading, isError }, setUrl] = useDataApi(`/posts/?author_username=${username}`, {
      results: [],
    });

    const [{ data:author, isLoading:isLoadingAuthor, isError:isErrorAuthor }, authorUrl] = useDataApi(`/users/${username}`, {
      results: {},
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
        {isError && <p className="danger">{isError}</p>}
        {isLoadingAuthor ? <Spinner /> : <AuthorProfileCard author={author}/>}
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