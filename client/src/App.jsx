import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas);
import { NavLink, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header.jsx";
import { Home } from "./components/Home/Home.jsx";
import { Login } from "./components/Auth/Login.jsx";
import { Register } from "./components/Auth/Register.jsx";
import { Loading_Spinner } from "./components/Loading_Spinner/Loading_Spinner.jsx";
import { User_Context_Provider } from "./context/User_Context.jsx";
import { Read_Full_Blog } from "./components/Read_Full_Blog/Read_Full_Blog.jsx";

const Read_Blogs = React.lazy(() =>
  import("./components/Read_Blogs/Read_Blogs.jsx"),
);
const Contact_Us = React.lazy(() =>
  import("./components/Contact_Us/Contact_Us.jsx"),
);
const Write_Blogs = React.lazy(() =>
  import("./components/Write_Blogs/Write_Blogs.jsx"),
);
function App() {
  return (
    <User_Context_Provider>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="read_blogs"
            element={
              <React.Suspense fallback={<Loading_Spinner />}>
                <Read_Blogs />
              </React.Suspense>
            }
          />
          <Route
            path="write_blogs"
            element={
              <React.Suspense fallback={<Loading_Spinner />}>
                <Write_Blogs />
              </React.Suspense>
            }
          />
          <Route
            path="contact_us"
            element={
              <React.Suspense fallback={<Loading_Spinner />}>
                <Contact_Us />
              </React.Suspense>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/post/:id" element={<Read_Full_Blog />} />
        </Routes>
      </main>
      <footer></footer>
    </User_Context_Provider>
  );
}

export default App;
