import { RouterProvider } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import router from "./router/router";
import Layout from "./ui/Layout";

function App() {
  useAuth();

  return (
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  );
}

export default App;
