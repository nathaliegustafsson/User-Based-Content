// PostContext.tsx
import { createContext, useContext, useState } from "react";

export interface Post {
  timestamp: string;
  _id: string;
  // avatar: string;
  username: string;
  // location: string;
  content: string;
  title: string;
  author: {
    username: string;
  };
}

interface Props {
  children: React.ReactNode;
}

interface PostContextProps {
  posts: Post[];
  getAllPosts: () => void;
  getPostById: (_id: string) => Promise<Post | null>;
  createPost: (newPost: Post) => void;
  updatePost: (updatedPost: Post) => void;
  deletePost: (id: string) => void;
}

const PostContext = createContext<PostContextProps>({
  posts: [],
  getAllPosts: () => {},
  getPostById: () => Promise.resolve(null),
  createPost: () => {},
  updatePost: () => {},
  deletePost: () => {},
});

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getAllPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts.");
      }
      const posts = await response.json();
      const postsWithAuthors = await Promise.all(
        posts.map(async (post: Post) => {
          const authorResponse = await fetch(
            `/api/users/username?userId=${post.author}`
          );
          if (!authorResponse.ok) {
            throw new Error("Failed to fetch author.");
          }
          const authorData = await authorResponse.json();
          return {
            ...post,
            author: authorData.username,
          };
        })
      );
      setPosts(postsWithAuthors);
    } catch (error) {
      console.error(error);
    }
  };

  const getPostById = async (_id: string): Promise<Post | null> => {
    try {
      const response = await fetch(`/api/posts/${_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post.");
      }
      const getPost = await response.json();
      return getPost;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const createPost = async (newPost: Post) => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error("Failed to create post.");
      }
      const createdPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, createdPost]);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async (updatedPost: Post) => {
    try {
      const response = await fetch(`/api/posts/${updatedPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        throw new Error("Failed to update post.");
      }

      const updatedPostData = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPostData.id ? updatedPostData : post
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (_id: string) => {
    try {
      const response = await fetch(`/api/posts/:id`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post.");
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== _id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getAllPosts,
        getPostById,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
