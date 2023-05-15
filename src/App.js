import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Home, Write, Login, Post, Register, Contact, About, Posts,  } from "./pages";
import { Navbar, Footer } from "./components";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/write", element: <Write /> },
      { path: "/post/:id", element: <Post /> },
      { path: "/posts", element: <Posts /> },
      { path: "/about-us/", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  { path: "/register", element: <Register /> },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
