"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthorizedMiddleware } from "@/components/isAuthorizedUser";
import { RootState } from "../store/store";
import { fetchPosts } from "../store/posts/postsSlice";
import Posts from "@/components/blog/posts";

const BlogPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const status = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "idle" && error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul>{posts.length && <Posts posts={posts} />}</ul>
    </div>
  );
};

export default isAuthorizedMiddleware(BlogPage);
