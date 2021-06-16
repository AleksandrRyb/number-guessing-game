import React from "react";
import { useActions } from "../hooks/use-action.hooks";
import { useTypedSelector } from "../hooks/use-typed-selector.hooks";
import { inviteSend } from "../redux/action-creators/invite.action-creators";
import {
  joinToGameRequest,
  subscribeToPlayersRequest,
  subscribeToGameRequest,
  gameStartRequest,
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
  Input,
  Block,
  PageContent,
  BlockTitle,
  Popover,
} from "framework7-react";
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
  }, [profile]);

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

          if (players) {
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

  const startButton = (
    <Button
      className="margin-left"
      onClick={() =>
        dispatch(
          gameStartRequest(f7route.params.gameId, players[0], players[1])
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
      <Popover
        closeByOutsideClick={false}
        closeByBackdropClick={false}
        opened={openInvitePopover}
      >
        <Block>
          <BlockTitle medium className="text-align-center">
            Send Email
          </BlockTitle>
          <Input
            onChange={handleInviteChange}
            name="email"
            value={inviteForm.email}
            style={{ padding: "7px 0 7px 0px" }}
            className="margin-bottom"
            placeholder="Email"
            outline
            type="email"
          />
          <Input
            onChange={handleInviteChange}
            name="message"
            value={inviteForm.message}
            style={{ padding: "7px 0 7px 0px" }}
            className="margin-bottom"
            placeholder="Message"
            outline
            type="text"
          />
          <div className="display-flex justify-content-space-around align-items-center">
            <Button
              onClick={() => setOpenInvitePopover(false)}
              className="color-yellow"
              fillMd
              text="Cancel"
            />
            <Button
              onClick={handleInviteSubmit}
              disabled={isSendingInvite}
              loading={isSendingInvite}
              className="color-green"
              fillMd
              text="Send Invite"
            />
          </div>
        </Block>
      </Popover>
    </Page>
  );
}

export default GamePage;
