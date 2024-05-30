import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { RootLayout } from "./layouts/RootLayout.jsx";
import { WriteBlogs } from "./pages/WriteBlogs.jsx";
import { ReadBlogs } from "./pages/ReadBlogs.jsx";
import { Protected } from "./utils/Protected.jsx";
import { EditPost } from "./pages/EditPost.jsx";
import { Post } from "./pages/Post.jsx";
import { Footer } from "./components/static/Footer.jsx";

function App() {
  return (
    <>
      <RootLayout>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route
            path={"/read-blogs"}
            element={<Protected Component={ReadBlogs} />}
          />
          <Route path={"/post/:id"} element={<Protected Component={Post} />} />
          <Route
            path={"/write-blogs"}
            element={<Protected Component={WriteBlogs} />}
          />
          <Route
            path="/post/edit/:id"
            element={<Protected Component={EditPost} />}
          />
        </Routes>
      </RootLayout>
    </>
  );
}

export default App;
