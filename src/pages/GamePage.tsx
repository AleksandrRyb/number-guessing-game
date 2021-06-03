//@ts-nocheck
import React from "react";

import "../styles/gamepage.css";

import {
  Navbar,
  NavTitle,
  Page,
  Button,
  PageContent,
  BlockTitle,
  List,
  ListItem,
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  Popover,
  Input,
} from "framework7-react";

const players = [
  {
    avatar: "https://i.imgflip.com/13ga6y.jpg",
    username: "john snow",
    userId: "fsg9s9gr9dug9uwgh",
    score: 2,
  },
  {
    avatar:
      "https://www.meme-arsenal.com/memes/22cabae738382238ae798d49707b4b30.jpg",
    username: "daenerys targaryen",
    userId: "sg9s9gr9dfrgrgh",
    score: 2,
  },
];

function GamePage() {
  const [popover, setPopover] = React.useState(false);

  return (
    <Page hideContent className="game">
      <Navbar>
        <NavTitle>Game</NavTitle>
      </Navbar>
      <PageContent className="text-align-center">
        <BlockTitle large>Players List</BlockTitle>
        <Card className="display-inline-block">
          <CardContent padding={false}>
            <List>
              {players.map((player) => (
                <Player key={player.userId} player={player} />
              ))}
            </List>
          </CardContent>
        </Card>
      </PageContent>
      <div style={{ position: "relative" }}>
        <Popover
          opened={popover}
          closeByOutsideClick={false}
          closeByBackdropClick={false}
        >
          <PlayerMessage />
        </Popover>
      </div>
    </Page>
  );
}

//Player view to game list
function Player({ player }) {
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

//Component for recieve game notifications
function PlayerMessage() {
  return (
    <Card>
      <CardContent className="text-align-center margin-bottom">
        <BlockTitle medium>Guess the number</BlockTitle>
        <Input
          className="margin-bottom margin-top"
          placeholder="enter the number"
          type="number"
        />
        <Button text="submit" fill />
      </CardContent>
    </Card>
  );
}

export default GamePage;
