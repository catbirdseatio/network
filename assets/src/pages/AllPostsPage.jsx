import React from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import useDataApi from "../hooks/useDataApi";
import { useUserContext } from "../contexts/UserContext";
import { useApi } from "../contexts/ApiProvider";
import { useFlash } from "../contexts/FlashProvider";
import Body from "../components/Body";
import Posts from "../components/Posts";
import NavButtons from "../components/NavButtons";
import PostForm from "../components/PostForm";
import { Container } from "react-bootstrap";

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
  const flash = useFlash()
  const { user } = useUserContext();
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
      flash("The post was successfully submitted.", "success")
      fetchPosts();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Body>
      <h2>All Posts</h2>
      {user.is_authenticated && (
        <Container fluid className="mb-3">
          <PostForm onSubmit={submitHandler} />
        </Container>
      )}
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
