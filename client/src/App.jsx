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

const Read_Blogs = React.lazy(() =>
  import("./components/Read_Blogs/Read_Blogs.jsx"),
);
const Write_Blogs = React.lazy(() =>
  import("./components/Write_Blogs/Write_Blogs.jsx"),
);
function App() {
  return (
    <>
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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;