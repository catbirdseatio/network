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

const AllPostsPage = () => {
  const [{ data, isLoading, isError }, setUrl, fetchPosts] = useDataApi(
    "/posts/",
    {
      results: [],
    }
  );
  const { results, next, previous } = data;
  const pagination = { next, previous };
  const api = useApi();
  const { user, isAuthenticated } = useUserContext()
  const navigate = useNavigate();

  const nextButtonHandler = () => {
    setUrl(pagination.next);
  };
  const previousButtonHandler = () => {
    setUrl(pagination.previous);
  };

  const submitHandler = async (data) => {
    try {
      await api.post("/posts/", data);
      // reset state by resetting url and navigating back to homepage.
      setUrl("/posts/");
      fetchPosts();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Body>
      <h2>All Posts</h2>
      {isAuthenticated() && <PostForm onSubmit={submitHandler} />}
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
