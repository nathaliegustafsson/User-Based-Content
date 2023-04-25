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
            throw new Error("Failed to create post.")
        }
        const createdPost = await response.json();
        setPost(createdPost);
    } catch (error) {
        console.error(error);
    }
  };

  const updatePost = (updatePost: Post) => {
    // setPost((prevPost) =>
    //   prevPost ? { ...prevPost, ...updatePost } : prevPost
    // );
  };

  const deletePost = () => {
    // setPost(null);
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
