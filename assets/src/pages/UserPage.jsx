import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Spinner from "react-bootstrap/Spinner";

import useDataApi from "../hooks/useDataApi";
import { useFlash } from "../contexts/FlashProvider";
import Body from "../components/Body";
import Posts from "../components/Posts";
import NavButtons from "../components/NavButtons";
import AuthorProfileCard from "../components/AuthorProfileCard";


const UserPage = () => {
  { 

    const { username } = useParams();
    const { flash } = useFlash();

    const [{ data:posts, isLoading:isLoadingPosts, isError:isErrorPosts }, setUrl] = useDataApi(`/posts/?author_username=${username}`, {
      results: [],
    });

    const [{ data:author, isLoading:isLoadingAuthor, isError:isErrorAuthor }, authorUrl] = useDataApi(`/users/${username}`, {
      results: {},
    });

    // If a user new user profile is selected, don't forget to change the request urls
    useEffect(() => {
      setUrl(`/posts/?author_username=${username}`);
      authorUrl(`/users/${username}`);
    }, [username])
    

    const { results, next, previous } = posts;
    const pagination = { next, previous };
  
    const nextButtonHandler = () => {
      setUrl(pagination.next);
    };
    const previousButtonHandler = () => {
      setUrl(pagination.previous);
    };
  
    return (
      <Body>
        {isErrorPosts && flash("There was an error with posts.", "danger")}
        {isErrorAuthor && flash("There was an error with the author.", "danger")}
        {isLoadingAuthor ? <Spinner /> : <AuthorProfileCard author={author}/>}
        {isLoadingPosts ? <Spinner /> : <Posts posts={results} />}
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