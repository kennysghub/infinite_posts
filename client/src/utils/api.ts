import axios, { AxiosResponse } from "axios";
import { Comment, PostType } from "../types";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
});

export const fetchPosts = async (
  startIndex: number = 0,
  limit: number = 10
): Promise<PostType[]> => {
  try {
    const response: AxiosResponse<PostType[]> = await apiClient.get(
      `/api/posts?start=${startIndex}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async (data: Partial<PostType>): Promise<PostType> => {
  try {
    const response: AxiosResponse<PostType> = await apiClient.post("/api/posts", data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePostHugs = async (postUrl: string) => {
  try {
    await apiClient.put(`/api/posts/${encodeURIComponent(postUrl)}/hugs`);
  } catch (error) {
    console.error("Error updating hugs:", error);
    throw error;
  }
};

export const addComment = async (postUrl: string, commentText: string): Promise<Comment> => {
  try {
    const response: AxiosResponse<Comment> = await apiClient.post(
      `/api/posts/${encodeURIComponent(postUrl)}/comments`,
      { text: commentText }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};
