import { createBrowserRouter } from "react-router-dom";
import Entry from "../pages/Entry";
import GamePage from "../pages/GamePage";
import Home from "../pages/Home";
import InitiateGame from "../pages/InitiateGame";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../ui/ErrorPage";
import Layout from "../ui/Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/startGame",
        element: (
          <PrivateRoute>
            <InitiateGame />
          </PrivateRoute>
        ),
      },
      {
        path: "/gamePage/:gameId",
        element: (
          <PrivateRoute>
            <GamePage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/entry",
    element: (
      <PublicRoute>
        <Entry />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
