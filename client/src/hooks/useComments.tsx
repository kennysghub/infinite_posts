import React from "react";
import { addComment } from "../utils/api";
import { Comment } from "../types";

const useComments = (postUrl: string, initialComments: Record<string, Comment>) => {
  const [showComments, setShowComments] = React.useState(false);
  const [comments, setComments] = React.useState<Record<string, Comment>>(initialComments);
  const [commentText, setCommentText] = React.useState("");

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newComment = await addComment(postUrl, commentText);
      setComments((prevComments) => ({
        ...prevComments,
        [newComment.id]: newComment,
      }));
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return {
    showComments,
    toggleComments,
    comments,
    commentText,
    setCommentText,
    handleCommentSubmit,
  };
};

export default useComments;
