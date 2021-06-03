//@ts-nocheck
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const authRoutes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/:gameId",
    component: GamePage,
  },
];

const unAuthRoutes = {
  path: "/",
  component: LoginPage,
};

export function checkAuthRoutes(user: any) {
  //default params
  let params = {
    id: "com.numberguessinggame.",
    name: "Number Guessing Game",
    routes: [],
  };

  //if user not authenticated we put only login route to routes
  if (!user) {
    params.routes.push(unAuthRoutes);
    return params;
  }

  //if authenticated we give him all routes
  params.routes = authRoutes;
  return params;
}
