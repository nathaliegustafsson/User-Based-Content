// PostContext.tsx
import { createContext, useContext, useState } from "react";

export interface Post {
  id: string;
  // avatar: string;
  username: string;
  // location: string;
  content: string;
  title: string;
}

interface Props {
  children: React.ReactNode;
}

interface PostContextProps {
  posts: Post[];
  getAllPosts: () => void;
  getPostById: (id: string) => Promise<Post | null>;
  createPost: (newPost: Post) => void;
  updatePost: (updatedPost: Post) => void;
  deletePost: (id: number) => void;
}

const PostContext = createContext<PostContextProps>({
  posts: [],
  // post: null,
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
      const getAllPosts = await response.json();
      setPosts(getAllPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const getPostById = async (id: string): Promise<Post | null> => {
    try {
      const response = await fetch(`/api/posts/:id`);
      if (!response.ok) {
        throw new Error("Failed to fetch post.");
      }
      const getAllPosts = await response.json();
      return getAllPosts;
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
      const response = await fetch(`/api/posts/${updatedPost.id}`, {
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
          post.id === updatedPostData.id ? updatedPostData : post
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      const response = await fetch(`/api/posts/:id`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post.");
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
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
