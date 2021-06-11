import React from "react";
import { useActions } from "../hooks/use-action.hooks";
import { userLoginRequest } from "../redux/action-creators/user.action-creators";
import { useTypedSelector } from "../hooks/use-typed-selector.hooks";

import bluecard from "../assets/images/bluecard.png";
import {
  Page,
  Block,
  BlockTitle,
  Button,
  PageContent,
  Preloader,
} from "framework7-react";

function LoginPage({ f7router }: any) {
  const { user, isFetchingUser, isListening } = useTypedSelector(
    (state) => state.user
  );
  const dispatch = useActions();

  React.useEffect(() => {
    if (user) {
      f7router.navigate("/");
    }
  }, [user]);

  return (
    <Page className="login">
      {isListening ? (
        <PageContent
          style={{ paddingTop: "40vh" }}
          className="text-align-center"
        >
          <Preloader size={70} color="blue" />
        </PageContent>
      ) : (
        <PageContent>
          <BlockTitle
            className="text-align-center"
            style={{ marginBottom: "75px" }}
            large
          >
            Login to join the number guessing game!
          </BlockTitle>
          <Block className="text-align-center">
            <div style={{ marginBottom: "25px" }}>
              <img
                height="400px"
                src={bluecard}
                alt="humber guessing game login"
              />
            </div>
            <div className="display-inline-block">
              <Button
                onClick={() => dispatch(userLoginRequest())}
                fillMd
                text="Login with google"
              />
            </div>
          </Block>
        </PageContent>
      )}
    </Page>
  );
}

export default LoginPage;
