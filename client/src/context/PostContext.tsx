import { createContext, useContext, useState } from "react";

interface Post {
  title: string;
  content: string;
}

interface Props {
  children: React.ReactNode;
}

interface PostContextProps {
  post: Post | null;
  createPost: (newPost: Post) => void;
  updatePost: (updatedPost: Post) => void;
  deletePost: () => void;
}

const PostContext = createContext<PostContextProps>({
  post: null,
  createPost: () => {},
  updatePost: () => {},
  deletePost: () => {},
});

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }: Props) => {
  const [post, setPost] = useState<Post | null>(null);

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
      setPost(createdPost);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async (updatePost: Post) => {
    try {
      if (!post) {
        throw new Error("Can't update post - post is null");
      }

      const response = await fetch("/api/posts/:id", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePost),
      });

      if (!response.ok) {
        throw new Error("failed to update post");
      }

      const updatedPostData = await response.json();
      setPost(updatedPostData);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async () => {
    try {
      await fetch("/api/posts/:id", {
        method: "DELETE",
      });
      setPost(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        post,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
