import React from "react";

//Components
import {
  Button,
  Navbar,
  NavRight,
  NavTitle,
  Page,
  PageContent,
  BlockTitle,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
} from "framework7-react";

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

function HomePage() {
  return (
    <Page className="main">
      <Navbar>
        <NavTitle>Number Guessing Game</NavTitle>
        <NavRight>
          <Button text="Logout" fill className="margin-right" />
        </NavRight>
      </Navbar>
      <PageContent className="text-align-center">
        <BlockTitle large>Player Profile</BlockTitle>
        <PlayerCard />
        <div>
          <Button className="display-inline-block" fill text="start the game" />
        </div>
        <GameList />
      </PageContent>
    </Page>
  );
}

function PlayerCard() {
  return (
    <Card className="display-inline-block" style={{ minWidth: 350 }}>
      <CardHeader className="display-block">
        <img
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
          }}
          alt="player name"
          src="https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
        />
      </CardHeader>

      {/* Player Info */}
      <CardContent>
        <div
          style={{
            fontSize: 25,
            color: "black",
          }}
        >
          Score
        </div>
        <span className="margin-right">Wins: 6</span>
        <span>Loses: 1</span>
      </CardContent>
    </Card>
  );
}

function GameList() {
  return (
    <List>
      {games.map((game) => (
        <ListItem
          link
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
}

export default HomePage;
