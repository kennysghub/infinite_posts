import React from "react";
import { PostType } from "../types";

const useInfiniteScroll = (
  fetchPosts: (startIndex: number, limit?: number) => Promise<PostType[]>,
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>,
  setStartIndex: React.Dispatch<React.SetStateAction<number>>,
  startIndex: number,
  initialPostsLimit: number
) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const lastPostRef = React.useRef<HTMLDivElement | null>(null);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const fetchMorePosts = React.useCallback(async () => {
    try {
      setIsLoadingMore(true);
      const newPosts = await fetchPosts(startIndex);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPosts((prevPosts) => [
        ...prevPosts,
        ...(newPosts as unknown as PostType[]),
      ]);
      setStartIndex((prevStartIndex) => prevStartIndex + newPosts.length);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setIsLoadingMore(false);
    }
  }, [fetchPosts, setPosts, setStartIndex, startIndex]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts(0, initialPostsLimit);
        setPosts(data);
        setStartIndex((prevStartIndex) => prevStartIndex + data.length);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchPosts, initialPostsLimit, setPosts, setStartIndex]);

  React.useEffect(() => {
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

  return {
    loading,
    error,
    lastPostRef,
    fetchMorePosts: { loading: isLoadingMore },
  };
};

export default useInfiniteScroll;
