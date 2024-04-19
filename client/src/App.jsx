import React from "react";
import {Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fab, fas);
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import {RootLayout} from "./Layouts/RootLayout.jsx";
import {WriteBlogs} from "./pages/WriteBlogs.jsx";
import {ReadBlogs} from "./pages/ReadBlogs.jsx";

function App() {
  return (
      <RootLayout>
          <Routes>
              <Route path={'/'} element={<Home/>}/>
              <Route path={'/login'} element={<Login/>}/>
              <Route path={'/register'} element={<Register/>}/>
              <Route path={'/read-blogs'} element={<ReadBlogs/>}/>
              <Route path={'/write-blogs'} element={<WriteBlogs/>}/>
          </Routes>
      </RootLayout>
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
    //           <React.Suspense fallback={<Loading_Spinner />}>
    //             <Read_Blogs />
    //           </React.Suspense>
    //         }
    //       />
    //       <Route
    //         path="write_blogs"
    //         element={
    //           <React.Suspense fallback={<Loading_Spinner />}>
    //             <Write_Blogs />
    //           </React.Suspense>
    //         }
    //       />
    //       <Route
    //         path="contact_us"
    //         element={
    //           <React.Suspense fallback={<Loading_Spinner />}>
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
