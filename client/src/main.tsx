import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import CreateProfilePage from "./pages/CreateProfilePage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import StartPage from "./pages/StartPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<StartPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/createprofile" element={<CreateProfilePage />} />
      <Route path="/user/:id" element={<ProfilePage />} />
      {/* <Route path="/user/:id/posts" element={<CreatePostPage />} /> */}
      {/* <Route path="/user/:id/posts" element={<EditAndDeletePostPage />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
