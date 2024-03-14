import React from "react";
import hugIcon from "../assets/hug-icon.png";
interface Comment {
  id: number;
  parent_id: number | null;
  display_name: string;
  text: string;
  created_at: string;
  // Add any other properties of the comment object
}

interface Post {
  post_url: string;
  comments: { [key: string]: Comment };
  title: string;
  patient_description: string;
  assessment: string;
  question: string;
  num_hugs: number;
  created_at: string;
}

interface PostProps {
  post: Post;
  isLastPost?: boolean;
  lastPostRef?: React.RefObject<HTMLDivElement>;
  onHugClick: (url: string) => void;
  onCommentSubmit: (postUrl: string, commentText: string) => void;
  comments: { [key: string]: Comment };
}

const Post: React.FC<PostProps> = ({
  post,
  isLastPost,
  lastPostRef,
  onHugClick,
  onCommentSubmit,
}) => {
  const [commentText, setCommentText] = React.useState("");
  const [showComments, setShowComments] = React.useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleHugClick = () => {
    onHugClick(post.post_url);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCommentSubmit(post.post_url, commentText);
    setCommentText("");
  };
  return (
    <div ref={isLastPost ? lastPostRef : null} style={styles.container}>
      <h2 style={styles.title}>{post.title}</h2>
      <p style={styles.content}>{post.patient_description}</p>
      <p>Assessment: {post.assessment}</p>
      <button onClick={handleHugClick}>
        {post.num_hugs} <img src={hugIcon} height="25px" /> Hugs
      </button>
      <button onClick={toggleComments}>{showComments ? "Hide Comments" : "Show Comments"}</button>
      {showComments && (
        <div>
          <ul>
            {Object.values(post.comments).map((comment) => (
              <li key={comment.id}>
                <strong>{comment.display_name}:</strong> {comment.text}
              </li>
            ))}
          </ul>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">Submit</button>
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
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
