import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

interface Route {
  path: string;
  component: () => JSX.Element;
}
interface Params {
  id: string;
  name: string;
  routes: [] | Route[];
}

const authRoutes: Route[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/:gameId",
    component: GamePage,
  },
];

const unAuthRoutes: Route[] = [
  {
    path: "/",
    component: LoginPage,
  },
];

export function checkAuthRoutes(user: any) {
  //default params
  let params: Params = {
    id: "com.numberguessinggame.",
    name: "Number Guessing Game",
    routes: [],
  };

  //if user not authenticated we put only login route to routes
  if (!user) {
    params.routes = unAuthRoutes;
    return params;
  }

  //if authenticated we give him all routes
  params.routes = authRoutes;
  return params;
}
