import React from "react";
import { IPlayer } from "../types/game.types";

import { Card, CardHeader, CardContent, CardFooter } from "framework7-react";

function Player({ player, currentPlayerId, nextPlayerId }: IPlayer) {
  const currentPlayerBorder = currentPlayerId === player.id && {
    border: "2px solid red",
  };
  const nextPlayerBorder = nextPlayerId === player.id && {
    border: "2px solid blue",
  };
  const borderStyle = currentPlayerBorder || nextPlayerBorder || { border: "" };

  return (
    <Card className="display-block" style={{ minWidth: "200px" }}>
      <CardHeader>
        <div style={{ margin: "0 auto" }}>{player.profile.name}</div>
      </CardHeader>
      <CardContent>
        <img
          style={borderStyle}
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
