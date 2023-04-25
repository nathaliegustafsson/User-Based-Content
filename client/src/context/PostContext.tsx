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

  const createPost = (newPost: Post) => {
    setPost(newPost);
  };

  const updatePost = (updatePost: Post) => {
    setPost((prevPost) =>
      prevPost ? { ...prevPost, ...updatePost } : prevPost
    );
  };

  const deletePost = () => {
    setPost(null);
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
