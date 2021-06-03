//Pages
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

export function checkAuthRoutes(user: any) {
  const params = {
    id: "com.numberguessinggame.",
    name: "Number Guessing Game",
    routes: [
      {
        path: "/",
        component: user ? HomePage : LoginPage,
      },
      {
        path: "/:gameId",
        component: GamePage,
      },
    ],
  };

  return params;
}
