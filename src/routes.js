import Home from "./pages/Home";
import NetworkError from "./pages/NetworkError";
import NoPermission from "./pages/NoPermission";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import Products from "./pages/Products";

const routes = [
  { path: "", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/products", component: <Products /> },
  { path: "/orders", component: <Orders /> },
  { path: "/network-error", component: <NetworkError /> },
  { path: "/no-permission", component: <NoPermission /> },
  { path: "*", component: <NotFound /> },
];

export default routes;
