import React from "react";

import { PostType } from "../types";

import hugIcon from "../assets/hug-icon.png";
import useHugs from "../hooks/useHugs";
import useComments from "../hooks/useComments";

import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface PostProps {
  post: PostType;
  isLastPost?: boolean;
  lastPostRef?: React.RefObject<HTMLDivElement>;
}

const Post: React.FC<PostProps> = ({ post, isLastPost, lastPostRef }) => {
  const { num_hugs, handleHugClick } = useHugs(post.post_url, post.num_hugs);
  const {
    showComments,
    toggleComments,
    comments,
    commentText,
    setCommentText,
    handleCommentSubmit,
  } = useComments(post.post_url, post.comments);

  return (
    <div ref={isLastPost ? lastPostRef : null} style={styles.container}>
      <CardContent>
        <Typography sx={{ fontSize: 30 }} color="secondary" gutterBottom>
          {post.title}
        </Typography>
        <Typography color="dodgerblue" variant="h4" component="div">
          Description
        </Typography>
        <Typography variant="h6" component="div">
          {post.patient_description}
        </Typography>
        <Typography color="dodgerblue" sx={{ mb: 1.5, mt: 2 }} variant="h4">
          Assessment
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 20 }} color="text.primary">
          {post.assessment}
        </Typography>
      </CardContent>

      <Badge
        badgeContent={num_hugs}
        onClick={handleHugClick}
        color="primary"
        style={{ cursor: "pointer" }}
      >
        <img src={hugIcon} height="45px" alt="Hug Icon" />
      </Badge>
      <Button
        size="small"
        color="secondary"
        variant="contained"
        sx={{ ml: 5 }}
        onClick={toggleComments}
      >
        {showComments ? "Hide Comments" : "Show Comments"}
      </Button>

      {showComments && (
        <div>
          <ul>
            {Object.values(comments).map(({ id, display_name, text }) => (
              <li style={{ listStyleType: "none", padding: 0 }} key={id}>
                <strong style={{ fontSize: "22px" }}>{display_name}:</strong>
                <span style={{ fontSize: "20px" }}>{text}</span>
              </li>
            ))}
          </ul>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              style={{ width: 500 }}
              id="standard-textarea"
              label="Comment here..."
              placeholder="Placeholder"
              multiline
              variant="standard"
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Fab
              type="submit"
              size="small"
              color="primary"
              aria-label="add"
              sx={{ ml: 1 }}
            >
              <AddIcon />
            </Fab>
          </form>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "whitesmoke",
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    maxWidth: "90vw",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 1.5,
  },
};

export default Post;
