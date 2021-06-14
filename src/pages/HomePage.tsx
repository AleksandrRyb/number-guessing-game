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
  const dispatch = useActions();
  const { user, isFetchingUser, isListening } = useTypedSelector(
    (state) => state.user
  );
  const { profile, isFetchingProfile } = useTypedSelector(
    (state) => state.profile
  );
  const {
    invite,
    inviteFetchingPopup,
    inviteReplying,
    gameToRedirect,
    isListeningInvites,
  } = useTypedSelector((state) => state.invite);
  const { gameId } = useTypedSelector((state) => state.game);

  React.useEffect(() => {
    if (!user && !isListening) {
      f7router.navigate("/login");
    }
  }, [user, isFetchingUser]);

  React.useEffect(() => {
    if (user && !profile) {
      dispatch(profileRequest(user));
    }
  }, [user]);

  React.useEffect(() => {
    //Reditect to game when you create it.
    if (gameId) {
      f7router.navigate(`/game/${gameId}`);
    }

    //Redirect to game when you join it.
    if (gameToRedirect) {
      f7router.navigate(gameToRedirect);
    }
  }, [gameId, gameToRedirect]);

  React.useEffect(() => {
    //Listening for new messages, and get the newest one
    if (profile) {
      subscribeToInvites(profile, {
        next: (querySnapshot) => {
          if (!inviteReplying) {
            const snapshot = querySnapshot.docs.map((doc) => {
              const data = doc.data() as SnapshotInvite;
              return { id: doc.id, ...data };
            });
            if (snapshot[0] && isListeningInvites) {
              dispatch(inviteReceive(snapshot[snapshot.length - 1]));
            }
          }
        },
      });
    }
  }, [invite, isListeningInvites, profile]);

  function createGameHandler() {
    profile && dispatch(createGameRequest(profile));
  }

  async function replyInviteHandler(joined: boolean) {
    invite &&
      dispatch(inviteReply(invite.id, joined, joined ? invite?.gameUrl : null));
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
      opened={inviteFetchingPopup}
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
        {!profile ? noUserTitle : title}
        <NavRight>{!profile ? noUserLogOutButton : logOutButton}</NavRight>
      </Navbar>
      <PageContent className="text-align-center">
        {!profile ? noUserProfileTitle : profileTitle}
        <ProfileCard profile={profile} />
        <div>{!profile ? noUserStartGameButton : startGameButton}</div>
        <GameList user={user} />
      </PageContent>
      {invitePopower}
    </Page>
  );
}

export default HomePage;
