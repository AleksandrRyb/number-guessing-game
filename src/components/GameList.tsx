import React from "react";
import { User } from "../types/user.types";

import { List, ListItem, SkeletonBlock } from "framework7-react";

const games = [
  {
    avatar: "https://i.imgflip.com/13ga6y.jpg",
    username: "john snow",
    gameId: "fsg9s9gr9dug9uwgh",
  },
  {
    avatar:
      "https://www.meme-arsenal.com/memes/22cabae738382238ae798d49707b4b30.jpg",
    username: "daenerys targaryen",
    gameId: "sg9s9gr9dfrgrgh",
  },
];

function GameList({ user }: User) {
  const noGamesView = (
    <SkeletonBlock
      className="margin-bottom"
      style={{
        margin: "0 auto",
      }}
      tag="div"
      width="95vw"
      height="60px"
      borderRadius="10px"
      effect="wave"
    />
  );

  const gamesExistView = (
    <List>
      {games.map((game) => (
        <ListItem
          link={`/game/${game.gameId}`}
          title={`Game owner: ${game.username}`}
          key={game.gameId}
          // onClick={change route func}
        >
          <img
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundSize: "cover",
            }}
            src={game.avatar}
            alt={`number guessing game ${game.username}`}
          />
        </ListItem>
      ))}
    </List>
  );

  return user ? gamesExistView : noGamesView;
}

export default GameList;
