import React from "react";

import {
  ListItem,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "framework7-react";

function Player({ player }: any) {
  return (
    <ListItem className="display-block">
      <Card style={{ width: "100%" }}>
        <CardHeader>
          <div style={{ margin: "0 auto" }}>{player.username}</div>
        </CardHeader>
        <CardContent>
          <img
            className="player-avatar"
            src={player.avatar}
            alt={`number guessing game player: ${player.username}`}
          />
        </CardContent>
        <CardFooter>
          <div style={{ margin: "0 auto" }}>guessed: {player.score}</div>
        </CardFooter>
      </Card>
    </ListItem>
  );
}

export default Player;
