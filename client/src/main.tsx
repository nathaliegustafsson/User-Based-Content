import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import CreatePostPage from "./pages/CreatePostPage";
import CreateProfilePage from "./pages/CreateProfilePage";
import EditPostPage from "./pages/EditPostPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import StartPage from "./pages/StartPage";
import { theme } from "./theme/theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<StartPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/createprofile" element={<CreateProfilePage />} />
      <Route path="/user/:username" element={<ProfilePage />} />
      <Route path="/user/:id/create/posts" element={<CreatePostPage />} />
      <Route path="/posts/:_id" element={<PostPage />} />
      {/* <Route path="/posts/:_id" element={<EditAndDeletePostPage />} /> */}
      <Route path="/user/:id/edit/post" element={<EditPostPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <PostProvider>
          <RouterProvider router={router} />
        </PostProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
