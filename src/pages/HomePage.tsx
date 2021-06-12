import React from "react";
import { useActions } from "../hooks/use-action.hooks";
import { useTypedSelector } from "../hooks/use-typed-selector.hooks";
import { logOut } from "../redux/action-creators/user.action-creators";
import {
  profileRequest,
  updateProfile,
} from "../redux/action-creators/profile.action-creators";

import GameList from "../components/GameList";
import ProfileCard from "../components/ProfileCard";
import {
  Button,
  Navbar,
  NavRight,
  NavTitle,
  Page,
  PageContent,
  BlockTitle,
  SkeletonBlock,
  SkeletonText,
} from "framework7-react";

function HomePage({ f7router }: any) {
  const dispatch = useActions();
  const { user, isFetchingUser, isListening } = useTypedSelector(
    (state) => state.user
  );
  const { profile, isFetchingProfile } = useTypedSelector(
    (state) => state.profile
  );

  //Redirect if user not logged in
  React.useEffect(() => {
    if (!user && !isListening) {
      f7router.navigate("/login");
    }
  }, [user, isFetchingUser]);

  //Get Profile data if user logged in and profile does not exists
  React.useEffect(() => {
    if (user && !profile) {
      dispatch(profileRequest(user));
    }
  }, [user]);

  return (
    <Page className="main">
      <Navbar>
        {!user ? (
          <SkeletonText tag="div" effect="wave" className="title">
            Number Guessing Game
          </SkeletonText>
        ) : (
          <NavTitle>Number Guessing Game</NavTitle>
        )}
        <NavRight>
          {!user ? (
            <SkeletonBlock
              tag="button"
              width="80px"
              height="36px"
              borderRadius="5px"
              effect="wave"
              className="margin-right"
              style={{ border: "none" }}
            />
          ) : (
            <Button
              onClick={() => dispatch(logOut())}
              text="Logout"
              fill
              className="margin-right"
            />
          )}
        </NavRight>
      </Navbar>
      <PageContent className="text-align-center">
        {!user ? (
          <SkeletonText
            tag="div"
            effect="wave"
            style={{ borderRadius: "10px" }}
            className="block-title block-title-large"
          >
            Player Profile
          </SkeletonText>
        ) : (
          <BlockTitle large>Player Profile</BlockTitle>
        )}

        <ProfileCard profile={profile} />

        <div>
          {!user ? (
            <SkeletonBlock
              tag="button"
              width="145px"
              height="36px"
              borderRadius="5px"
              effect="wave"
              className="display-inline-block"
              style={{ border: "none" }}
            />
          ) : (
            <Button
              className="display-inline-block"
              fill
              text="start the game"
            />
          )}
        </div>
        <GameList user={user} />
      </PageContent>
    </Page>
  );
}

export default HomePage;
