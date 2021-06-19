import { Player } from "../types/game.types";

export function findNewNextPlayer(players: Player[], nextPlayer: Player) {
  let newNextPlayer;
  const index = players.findIndex((player) => player.id === nextPlayer.id);

  if (index + 1 >= players.length) {
    newNextPlayer = players[0];
  } else {
    newNextPlayer = players[index + 1];
  }

  return newNextPlayer;
}

export function findNewNextPlayerWithMoveDecrease(
  players: Player[],
  nextPlayer: Player,
  currentPlayer: Player
) {
  const newNextPlayer = findNewNextPlayer(players, nextPlayer);

  if (newNextPlayer.id === currentPlayer.id) {
    newNextPlayer.movePoints -= 1;
  }

  return newNextPlayer;
}

export function findGameLiders(players: Player[]) {
  const playerWithTheBiggestScore = players.reduce(
    //@ts-ignore
    (p1, p2) => (p1.guessed > p2.guessed ? p1 : p2)
  );

  const liders = players.filter(
    (player) => player.guessed === playerWithTheBiggestScore.guessed
  );

  return liders;
}

export function findTotalMovePoints(players: Player[]) {
  const totalMovePoints = players.reduce(
    (acc: number, player: Player) => acc + player.movePoints,
    0
  );

  return totalMovePoints;
}
