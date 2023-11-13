import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useApi } from "../../contexts/ApiProvider"

const Posts = () => {
  const [data, setData] = useState({results: []})  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const api = useApi();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get("/posts")
        setData(data);
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false);
      }
    })()
  }, [api])
  

  return (
    <>
    {error && <p className="danger">{error}</p>}
    {isLoading ? <Spinner /> : data.results.map(post => <p key={post.pk}><strong>{post.author}</strong>: {post.body}</p>)}
    
    </>
  );
};

export default Posts;
