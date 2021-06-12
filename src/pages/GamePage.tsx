import React from "react";

import "../styles/gamepage.css";

import {
  Navbar,
  NavTitle,
  Page,
  PageContent,
  BlockTitle,
  List,
  Card,
  CardContent,
  Popover,
} from "framework7-react";
import PlayerMessage from "../components/PlayerMessage";
import Player from "../components/Player";

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
    <Page className="game">
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

export default GamePage;
