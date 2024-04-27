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

    // <User_Context_Provider>
    //   <header>
    //     <Header />
    //   </header>
    //   <main>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route
    //         path="read_blogs"
    //         element={
    //           <React.Suspense fallback={<LoadingSpinner />}>
    //             <Read_Blogs />
    //           </React.Suspense>
    //         }
    //       />
    //       <Route
    //         path="write_blogs"
    //         element={
    //           <React.Suspense fallback={<LoadingSpinner />}>
    //             <Write_Blogs />
    //           </React.Suspense>
    //         }
    //       />
    //       <Route
    //         path="contact_us"
    //         element={
    //           <React.Suspense fallback={<LoadingSpinner />}>
    //             <Contact_Us />
    //           </React.Suspense>
    //         }
    //       />
    //       <Route path="login" element={<Login />} />
    //       <Route path="register" element={<Register />} />
    //       <Route path="/post/:id" element={<Read_Full_Blog />} />
    //       <Route path="/edit/:id" element={<Edit_Blogs />} />
    //     </Routes>
    //   </main>
    //   <footer></footer>
    // </User_Context_Provider>
  );
}

export default App;
