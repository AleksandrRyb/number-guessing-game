import React from "react";
import { useActions } from "../redux/hooks/use-action.hooks";
import { userLoginRequest } from "../redux/action-creators/user.action-creators";
import { useTypedSelector } from "../redux/hooks/use-typed-selector.hooks";

import bluecard from "../assets/images/bluecard.png";
import { Page, Block, BlockTitle, Button, PageContent } from "framework7-react";

function LoginPage({ f7router }: any) {
  const { user } = useTypedSelector((state) => state.user);
  const dispatch = useActions();

  React.useEffect(() => {
    if (user) {
      f7router.navigate(`/home/${user.uid}`);
    }
  }, [user, f7router]);

  return (
    <Page className="login">
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
    </Page>
  );
}

export default LoginPage;
