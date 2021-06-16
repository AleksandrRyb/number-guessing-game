import React from "react";
import { IPlayer } from "../types/game.types";

import {
  ListItem,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "framework7-react";

function Player({ player }: IPlayer) {
  return (
    <Card className="display-block" style={{ minWidth: "200px" }}>
      <CardHeader>
        <div style={{ margin: "0 auto" }}>{player.profile.name}</div>
      </CardHeader>
      <CardContent>
        <img
          className="player-avatar"
          src={player.profile.avatar}
          alt={`number guessing game player: ${player.profile.name}`}
        />
      </CardContent>
      <CardFooter>
        <div style={{ margin: "0 auto" }}>guessed: {player.guessed}</div>
      </CardFooter>
    </Card>
  );
}

export default Player;
