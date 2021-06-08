import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

export const params = {
  id: "com.numberguessinggame.",
  name: "Number Guessing Game",
  routes: [
    {
      path: "/home/:userId",
      component: HomePage,
    },
    {
      path: "/game/:gameId",
      component: GamePage,
    },
    {
      path: "/login",
      component: LoginPage,
    },
  ],
};
