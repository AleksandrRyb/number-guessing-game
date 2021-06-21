import React from "react";
import { useActions } from "../hooks/use-action.hooks";
import { useTypedSelector } from "../hooks/use-typed-selector.hooks";
import {
  findNewNextPlayerWithMoveDecrease,
  findGameLiders,
  findTotalMovePoints,
} from "../helpers/game.helpers";
import { inviteSend } from "../redux/action-creators/invite.action-creators";
import {
  joinToGameRequest,
  subscribeToPlayersRequest,
  subscribeToGameRequest,
  updateGameStateRequest,
  updatePlayersRequest,
  leaveGame,
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
  Popover,
} from "framework7-react";
import MakeGuessForm from "../components/notifications/MakeGuessForm";
import GuessingForm from "../components/notifications/GuessingForm";
import InviteForm from "../components/notifications/InviteForm";
import WinnerForm from "../components/notifications/WinnerForm";
import WaitingForm from "../components/notifications/WaitingForm";
import LoserForm from "../components/notifications/LoserForm";
import Player from "../components/Player";

const DEFAULT_INVITE_FORM = {
  email: "",
  message: "",
};

function GamePage({ f7route, f7router }: any) {
  const dispatch = useActions();
  const { profile } = useTypedSelector((state) => state.profile);
  const {
    players,
    isPlayersListening,
    game,
    isListeningGame,
    isJoiningGame,
    isGameStateUpdating,
    isPlayerUpdating,
  } = useTypedSelector((state) => state.game);
  const { isSendingInvite } = useTypedSelector((state) => state.invite);
  const [inviteForm, setInviteForm] = React.useState(DEFAULT_INVITE_FORM);
  const [openInvitePopover, setOpenInvitePopover] = React.useState(false);
  const [closeGamePopover, setCloseGamePopover] = React.useState(true);
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
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  React.useEffect(() => {
    if (profile) {
      if (
        players.length === 0 ||
        !players.some((player) => player.profile.id === profile.id)
      ) {
        dispatch(joinToGameRequest(profile, f7route.params.gameId));
      }
    }

    return () => {
      dispatch(leaveGame());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeGamePopover]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (isEven === true || isEven === false) {
        const newGameState = { currentPlayer, nextPlayer, isEven };
        dispatch(updateGameStateRequest(f7route.params.gameId, newGameState));
      }
    }
  }

  function handleGuessIsEven(response: boolean) {
    const totalMovePoints = findTotalMovePoints(players);
    let currentPlayer = game?.gameState.currentPlayer;
    let nextPlayer = game?.gameState.nextPlayer;
    if (nextPlayer !== undefined && currentPlayer !== undefined) {
      currentPlayer.movePoints--;
      nextPlayer.guessed =
        response === game?.gameState.isEven
          ? nextPlayer.guessed + 1
          : nextPlayer.guessed;

      //Here we check if game is done
      //if so we return only the game liders for nextrGameState
      const newNextPlayer = findNewNextPlayerWithMoveDecrease(
        totalMovePoints > 0 ? players : findGameLiders(players),
        nextPlayer,
        currentPlayer
      );
      const newGameState = {
        currentPlayer: nextPlayer,
        nextPlayer: newNextPlayer,
        isEven: null,
      };
      dispatch(updatePlayersRequest(currentPlayer, nextPlayer, newGameState));
    }
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

  const renderMakeGuessForm =
    game?.stages === "in-progress" &&
    profile?.id === game?.gameState.currentPlayer?.profileId;

  const renderGuessingForm =
    game?.stages === "in-progress" &&
    profile?.id === game?.gameState.nextPlayer?.profileId;

  const renderWaitingForm =
    game?.stages === "in-progress" &&
    profile?.id !== game?.winner?.profileId &&
    profile?.id !== game?.gameState.currentPlayer.profileId &&
    profile?.id !== game?.gameState.nextPlayer.profileId;

  const renderWinnerForm =
    game?.stages === "done" && game?.winner?.profileId === profile?.id;
  const renderLoserForm =
    game?.stages === "done" && profile?.id !== game?.winner?.profileId;

  const openPopoverCond =
    renderMakeGuessForm ||
    renderGuessingForm ||
    renderWinnerForm ||
    renderWaitingForm ||
    renderLoserForm;

  return (
    <Page className="game">
      <Navbar>
        <NavRight className="padding-right">
          {game?.stages === "creating" && (
            <Button
              onClick={() => setOpenInvitePopover(true)}
              fillMd
              text="Invite Player"
            />
          )}

          {game?.owner.id === profile?.id &&
            players.length >= 2 &&
            game?.stages === "creating" &&
            startButton}
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
            <Player
              key={player.id}
              player={player}
              currentPlayerId={game?.gameState.currentPlayer?.id}
              nextPlayerId={game?.gameState.nextPlayer?.id}
            />
          ))}
        </div>
      </PageContent>
      <Popover
        closeByOutsideClick={false}
        closeByBackdropClick={false}
        closeOnEscape={true}
        opened={closeGamePopover && openPopoverCond}
      >
        {renderMakeGuessForm && (
          <MakeGuessForm
            isGameStateUpdating={isGameStateUpdating}
            handleGuessingNumberChange={handleGuessingNumberChange}
            handleGuessingNumberSumbit={handleGuessingNumberSumbit}
            isEven={game?.gameState.isEven}
          />
        )}
        {renderGuessingForm && (
          <GuessingForm
            isPlayerUpdating={isPlayerUpdating}
            isGameStateUpdating={isGameStateUpdating}
            handleGuessIsEven={handleGuessIsEven}
            isEven={game?.gameState.isEven}
          />
        )}
        {renderWinnerForm && (
          <WinnerForm
            player={game?.winner}
            f7router={f7router}
            setCloseGamePopover={setCloseGamePopover}
          />
        )}
        {renderLoserForm && (
          <LoserForm
            setCloseGamePopover={setCloseGamePopover}
            f7router={f7router}
          />
        )}
        {renderWaitingForm && <WaitingForm />}
      </Popover>
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
    </Page>
  );
}

export default GamePage;
