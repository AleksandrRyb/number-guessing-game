import React from "react";
import { useActions } from "../hooks/use-action.hooks";
import { useTypedSelector } from "../hooks/use-typed-selector.hooks";
import { inviteSend } from "../redux/action-creators/invite.action-creators";
import {
  joinToGameRequest,
  subscribeToPlayersRequest,
  subscribeToGameRequest,
  updateGameStateRequest,
} from "../redux/action-creators/game.action-creators";
import * as db from "../firebase/api/game.api";
import { PlayerSnapshot, GameSnapshot } from "../types/game.types";

import "../styles/gamepage.css";

import {
  Navbar,
  NavTitle,
  NavRight,
  Button,
  Page,
  PageContent,
  BlockTitle,
} from "framework7-react";
import MakeGuessForm from "../components/notifications/MakeGuessForm";
import GuessingForm from "../components/notifications/GuessingForm";
import InviteForm from "../components/notifications/InviteForm";
import PlayerMessage from "../components/PlayerMessage";
import Player from "../components/Player";

const DEFAULT_INVITE_FORM = {
  email: "",
  message: "",
};

function GamePage({ f7route }: any) {
  const dispatch = useActions();
  const { profile } = useTypedSelector((state) => state.profile);
  const { players, isPlayersListening, game, isListeningGame, isJoiningGame } =
    useTypedSelector((state) => state.game);
  const { isSendingInvite } = useTypedSelector((state) => state.invite);
  const [inviteForm, setInviteForm] = React.useState(DEFAULT_INVITE_FORM);
  const [openInvitePopover, setOpenInvitePopover] = React.useState(false);
  const [openMakeGuessPopover, setMakeGuessPopover] = React.useState(false);
  const [openGuessingPopover, setGuessingPopover] = React.useState(false);
  const [guessingNumber, setGuessingNumber] =
    React.useState<null | number>(null);

  React.useEffect(() => {
    if (profile && isListeningGame) {
      db.subscribeToGame(f7route.params.gameId, {
        next: (snapshot) => {
          const game = {
            id: snapshot.id,
            ...(snapshot.data() as GameSnapshot),
          };
          dispatch(subscribeToGameRequest(game));

          if (game.gameState.currentPlayer?.profileId === profile.id) {
            setMakeGuessPopover(true);
          }
          if (game.gameState.nextPlayer?.profileId === profile.id) {
            setGuessingPopover(true);
          }
        },
      });
    }
  }, [profile, isListeningGame]);

  React.useEffect(() => {
    if (profile && !isPlayersListening) {
      if (
        players.length == 0 ||
        !players.some((player) => player.profile.id === profile.id)
      ) {
        dispatch(joinToGameRequest(profile, f7route.params.gameId));
      }
    }
  }, [profile, isPlayersListening]);

  React.useEffect(() => {
    if (profile && isPlayersListening && !isJoiningGame) {
      db.subscribeToPlayers(f7route.params.gameId, {
        next: (querySnapshot) => {
          const players = querySnapshot.docs.map((doc) => {
            const data = doc.data() as PlayerSnapshot;
            return { id: doc.id, ...data };
          });

          if (players && !isJoiningGame) {
            dispatch(subscribeToPlayersRequest(players));
          }
        },
      });
    }
  }, [profile]);

  function handleInviteChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInviteForm((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleInviteSubmit() {
    const { email, message } = inviteForm;
    if (email.length && message.length && profile && profile.email !== email) {
      dispatch(inviteSend(profile, email, f7route.url, message));
      setInviteForm(DEFAULT_INVITE_FORM);
    }
  }

  function handleGuessingNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    setGuessingNumber(Number(e.target.value));
  }

  function handleGuessingNumberSumbit() {
    const isEven = guessingNumber && guessingNumber % 2 === 0;

    if (game?.gameState !== undefined) {
      const { currentPlayer, nextPlayer } = game.gameState;
      const newGameState = { currentPlayer, nextPlayer, isEven };
      //@ts-ignore
      dispatch(updateGameStateRequest(f7route.params.gameId, newGameState));
    }

    setMakeGuessPopover(false);
  }

  function handleGuessIsEven(isEven: boolean) {
    setGuessingPopover(false);
    //after press we need understand  correct answer or not
    //update current player move_point -1
    //update score of next_player if he guessed
    //Change next player to current and understand who will next
  }

  const startButton = (
    <Button
      className="margin-left"
      onClick={() =>
        dispatch(
          updateGameStateRequest(f7route.params.gameId, {
            currentPlayer: players[0],
            nextPlayer: players[1],
            isEven: null,
          })
        )
      }
      fillMd
      colorTheme="green"
      text="Start Game"
    />
  );

  return (
    <Page className="game">
      <Navbar>
        <NavRight className="padding-right">
          <Button
            onClick={() => setOpenInvitePopover(true)}
            fillMd
            text="Invite Player"
          />
          {game?.owner.id === profile?.id && players.length >= 2
            ? startButton
            : null}
        </NavRight>
        <NavTitle>Game</NavTitle>
      </Navbar>
      <PageContent className="text-align-center">
        <BlockTitle large>Players List</BlockTitle>
        <div
          className="display-flex justify-content-start"
          style={{ margin: "0 auto ", flexWrap: "wrap" }}
        >
          {players.map((player) => (
            <Player key={player.id} player={player} />
          ))}
        </div>
      </PageContent>
      {
        <InviteForm
          openInvitePopover={openInvitePopover}
          setOpenInvitePopover={setOpenInvitePopover}
          handleInviteChange={handleInviteChange}
          inviteForm={inviteForm}
          handleInviteSubmit={handleInviteSubmit}
          isSendingInvite={isSendingInvite}
        />
      }
      {
        <MakeGuessForm
          handleGuessingNumberChange={handleGuessingNumberChange}
          handleGuessingNumberSumbit={handleGuessingNumberSumbit}
          openMakeGuessPopover={openMakeGuessPopover}
        />
      }
      {
        <GuessingForm
          isEven={game?.gameState.isEven}
          openGuessingPopover={openGuessingPopover}
          handleGuessIsEven={handleGuessIsEven}
        />
      }
    </Page>
  );
}

export default GamePage;
