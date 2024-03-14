import React from "react";

import { PostType } from "../types";

import Post from "./Post";
import { fetchPosts } from "../utils/api";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const PostList: React.FC = () => {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [startIndex, setStartIndex] = React.useState(0);
  const [initialPostsLimit] = React.useState(3);

  const { loading, error, lastPostRef, fetchMorePosts } = useInfiniteScroll(
    fetchPosts,
    setPosts,
    setStartIndex,
    startIndex,
    initialPostsLimit
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {posts.map((post, index) => (
        <Post
          key={post.created_at}
          post={post}
          isLastPost={index === posts.length - 1}
          lastPostRef={lastPostRef}
        />
      ))}
      {fetchMorePosts.loading && <div>Loading more posts...</div>}
    </div>
  );
};

export default PostList;
