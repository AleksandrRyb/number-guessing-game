import React from "react";

//Assets
import bluecard from "../assets/images/bluecard.png";

//Components
import { Page, Block, BlockTitle, Button, PageContent } from "framework7-react";

function LoginPage() {
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
            <Button fillMd text="Login with google" />
          </div>
        </Block>
      </PageContent>
    </Page>
  );
}

export default LoginPage;
