import React from "react";
import { useActions } from "../hooks/use-action.hooks";
import { useTypedSelector } from "../hooks/use-typed-selector.hooks";
import { logOut } from "../redux/action-creators/user.action-creators";
import { profileRequest } from "../redux/action-creators/profile.action-creators";
import { createGameRequest } from "../redux/action-creators/game.action-creators";
import {
  inviteReceive,
  inviteReply,
} from "../redux/action-creators/invite.action-creators";
import { subscribeToInvites } from "../firebase/api/invite.api";

import { SnapshotInvite } from "../types/invite.types";

import GameList from "../components/GameList";
import ProfileCard from "../components/ProfileCard";
import {
  Block,
  BlockHeader,
  Button,
  Navbar,
  NavRight,
  NavTitle,
  Page,
  PageContent,
  BlockTitle,
  SkeletonBlock,
  SkeletonText,
  Popover,
} from "framework7-react";

function HomePage({ f7router }: any) {
  const [invitesRecievePopover, setInvitesReceivePopover] =
    React.useState(false);
  const dispatch = useActions();
  const { user, isFetchingUser, isListening } = useTypedSelector(
    (state) => state.user
  );
  const { profile } = useTypedSelector((state) => state.profile);
  const { invite, inviteReplying, gameToRedirect, isListeningInvites } =
    useTypedSelector((state) => state.invite);
  const { game, isFetchingGame } = useTypedSelector((state) => state.game);

  React.useEffect(() => {
    if (!user && !isListening) {
      f7router.navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isFetchingUser]);

  React.useEffect(() => {
    if (user && !profile) {
      dispatch(profileRequest(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    //Reditect to game when you create it.
    if (game) {
      f7router.navigate(`/game/${game.id}`);
    }

    //Redirect to game when you join it.
    if (gameToRedirect) {
      f7router.navigate(`/game/${gameToRedirect}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, gameToRedirect]);

  React.useEffect(() => {
    //Listening for new messages, and get the newest one
    if (profile) {
      return subscribeToInvites(profile, {
        next: (querySnapshot) => {
          if (!inviteReplying) {
            const inviteData = querySnapshot.docs.map((doc) => {
              const data = doc.data() as SnapshotInvite;
              return { id: doc.id, ...data };
            });

            if (inviteData) {
              dispatch(inviteReceive(inviteData[inviteData.length - 1]));
            }
          }
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListeningInvites, profile, inviteReplying]);

  function createGameHandler() {
    if (profile) {
      dispatch(createGameRequest(profile));
    }
  }

  function replyInviteHandler(joined: boolean) {
    if (invite) {
      dispatch(inviteReply(invite.id, joined, joined ? invite?.gameId : null));
      setInvitesReceivePopover(false);
    }
  }

  const noUserTitle = (
    <SkeletonText tag="div" effect="wave" className="title">
      Number Guessing Game
    </SkeletonText>
  );
  const title = <NavTitle>Number Guessing Game</NavTitle>;

  const noUserProfileTitle = (
    <SkeletonText
      tag="div"
      effect="wave"
      style={{ borderRadius: "10px" }}
      className="block-title block-title-large"
    >
      Player Profile
    </SkeletonText>
  );
  const profileTitle = <BlockTitle large>Player Profile</BlockTitle>;

  const noUserStartGameButton = (
    <SkeletonBlock
      tag="button"
      width="145px"
      height="36px"
      borderRadius="5px"
      effect="wave"
      className="display-inline-block"
      style={{ border: "none" }}
    />
  );
  const startGameButton = (
    <Button
      disabled={isFetchingGame}
      onClick={createGameHandler}
      className="display-inline-block"
      fill
      text="start the game"
    />
  );

  const noUserLogOutButton = (
    <SkeletonBlock
      tag="button"
      width="80px"
      height="36px"
      borderRadius="5px"
      effect="wave"
      className="margin-right"
      style={{ border: "none" }}
    />
  );

  const logOutButton = (
    <Button
      onClick={() => dispatch(logOut())}
      text="Logout"
      fill
      className="margin-right"
    />
  );

  const invitePopower = (
    <Popover
      closeByOutsideClick={false}
      closeByBackdropClick={false}
      opened={invite && f7router.url === "/" ? true : false}
    >
      <Block>
        <BlockTitle medium className="text-align-center">
          Player {invite?.sendFrom.name} invites you.
        </BlockTitle>
        <BlockHeader className="text-align-center margin-bottom">
          {invite?.message}
        </BlockHeader>
        <div className="display-flex justify-content-space-around align-items-center">
          <Button
            onClick={() => replyInviteHandler(false)}
            className="color-blue"
            fillMd
            text="Cancel"
            disabled={inviteReplying}
          />
          <Button
            onClick={() => replyInviteHandler(true)}
            className="color-green"
            fillMd
            text="Join the game"
            disabled={inviteReplying}
          />
        </div>
      </Block>
    </Popover>
  );

  return (
    <Page className="main">
      <Navbar>
        {profile ? title : noUserTitle}
        <NavRight>{profile ? logOutButton : noUserLogOutButton}</NavRight>
      </Navbar>
      <PageContent className="text-align-center">
        {profile ? profileTitle : noUserProfileTitle}
        <ProfileCard profile={profile} />
        <div>{profile ? startGameButton : noUserStartGameButton}</div>
        <GameList user={user} />
      </PageContent>
      {invitePopower}
    </Page>
  );
}

export default HomePage;
