import React from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import useDataApi from "../hooks/useDataApi";
import { useUserContext } from "../contexts/UserContext";
import { useApi } from "../contexts/ApiProvider";
import Body from "../components/Body";
import Posts from "../components/Posts";
import NavButtons from "../components/NavButtons";
import PostForm from "../components/PostForm";

const FollowingPage = () => {
  const [{ data, isLoading, isError }, setUrl, fetchPosts] = useDataApi(
    "/posts/feed",
    {
      results: [],
    }
  );
  
  const { results, next, previous } = data;
  const pagination = { next, previous };
  const api = useApi();
  const { user } = useUserContext()
  const navigate = useNavigate();

  const nextButtonHandler = () => {
    setUrl(pagination.next);
  };
  const previousButtonHandler = () => {
    setUrl(pagination.previous);
  };

  return (
    <Body>
      <h2>Feed</h2>
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

export default FollowingPage;
