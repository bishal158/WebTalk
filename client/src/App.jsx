import React from "react";
import { Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas);
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { RootLayout } from "./layouts/RootLayout.jsx";
import { WriteBlogs } from "./pages/WriteBlogs.jsx";
import { ReadBlogs } from "./pages/ReadBlogs.jsx";
import { Protected } from "./utils/Protected.jsx";
import { EditPost } from "./pages/EditPost.jsx";
import { Post } from "./pages/Post.jsx";
import { Footer } from "./layouts/Footer.jsx";

function App() {
  return (
    <>
      <RootLayout>
        <Footer>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route
              path={"/read-blogs"}
              element={<Protected Component={ReadBlogs} />}
            />
            <Route
              path={"/post/:id"}
              element={<Protected Component={Post} />}
            />
            <Route
              path={"/write-blogs"}
              element={<Protected Component={WriteBlogs} />}
            />
            <Route
              path="/post/edit/:id"
              element={<Protected Component={EditPost} />}
            />
          </Routes>
        </Footer>
      </RootLayout>
    </>
  );
}

export default App;
