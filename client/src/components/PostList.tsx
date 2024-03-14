// export default PostList;
import React, { useRef, useEffect, useCallback, useState } from "react";
import { fetchPosts, updatePostHugs, addComment } from "../utils/api";
import Post from "./Post";

interface Comment {
  id: number;
  parent_id: number | null;
  display_name: string;
  text: string;
  created_at: string;
}

interface PostType {
  post_url: string;
  title: string;
  created_at: string;
  num_hugs: number;
  patient_description: string;
  assessment: string;
  question: string;
  comments: { [key: string]: Comment };
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [initialPostsLimit] = useState(3);
  const lastPostRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMorePosts = useCallback(async () => {
    try {
      setIsLoadingMore(true);
      const newPosts = await fetchPosts(startIndex);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPosts((prevPosts) => [...prevPosts, ...(newPosts as unknown as PostType[])]);
      setStartIndex((prevStartIndex) => prevStartIndex + newPosts.length);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setIsLoadingMore(false);
    }
  }, [startIndex]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts(0, initialPostsLimit);
        console.log("data: ", data);
        setPosts(data);
        setStartIndex((prevStartIndex) => prevStartIndex + data.length);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialPostsLimit]);

  useEffect(() => {
    const lastPostEl = lastPostRef.current;

    if (!lastPostEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isLoadingMore) {
          fetchMorePosts();
        }
      },
      { threshold: 1 }
    );

    observer.observe(lastPostEl);

    return () => {
      if (lastPostEl) {
        observer.unobserve(lastPostEl);
      }
    };
  }, [fetchMorePosts, isLoadingMore]);

  // handleHugClick
  const handleHugClick = async (postUrl: string) => {
    try {
      await updatePostHugs(postUrl);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.post_url === postUrl ? { ...post, num_hugs: post.num_hugs + 1 } : post
        )
      );
    } catch (err) {
      console.error("Error updating hugs:", err);
    }
  };
  const handleCommentSubmit = async (postUrl: string, commentText: string) => {
    try {
      const newComment = await addComment(postUrl, commentText);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.post_url === postUrl
            ? { ...post, comments: { ...post.comments, [newComment.id]: newComment } }
            : post
        )
      );
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

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
          onHugClick={handleHugClick}
          onCommentSubmit={handleCommentSubmit}
          comments={post.comments}
        />
      ))}
      {isLoadingMore && <div>Loading more posts...</div>}
    </div>
  );
};

export default PostList;
