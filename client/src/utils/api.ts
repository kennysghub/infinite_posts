import axios, { AxiosResponse } from "axios";

interface Comment {
  id: number;
  parent_id: number | null;
  display_name: string;
  text: string;
  created_at: string;
  // Add any other properties of the comment object
}

interface Post {
  id: number;
  title: string;
  num_hugs: number;
  patient_description: string;
  assessment: string;
  question: string;
  comments: { [key: string]: Comment };
  created_at: string;
  post_url: string;
  // Add any other properties of the post object
}

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

export const fetchPosts = async (startIndex: number = 0, limit: number = 10): Promise<Post[]> => {
  try {
    const response: AxiosResponse<Post[]> = await apiClient.get(
      `/api/posts?start=${startIndex}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async (data: Partial<Post>): Promise<Post> => {
  try {
    const response: AxiosResponse<Post> = await apiClient.post("/api/posts", data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// ... (keep the existing code)

export const updatePostHugs = async (postUrl: string) => {
  const response = await fetch(
    `http://localhost:8000/api/posts/${encodeURIComponent(postUrl)}/hugs`,
    {
      method: "PUT",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update hugs");
  }
};

export const addComment = async (postUrl: string, commentText: string) => {
  const response = await fetch(
    `http://localhost:8000/api/posts/${encodeURIComponent(postUrl)}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: commentText }),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to add comment: ${response.statusText}`);
  }
  const data: Comment = await response.json();
  return data;
};
