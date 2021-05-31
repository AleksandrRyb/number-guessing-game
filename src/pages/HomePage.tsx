import React from "react";

//Assets
import bluecard from "../assets/images/bluecard.png";

//Components
import { Page, Block, BlockTitle } from "framework7-react";
import Buttom from "../components/Button";

function HomePage() {
  return (
    <Page style={{ height: "100vh" }} name="login">
      <BlockTitle
        className="text-align-center"
        style={{ marginBottom: "75px" }}
        large
      >
        Login to join the game!
      </BlockTitle>
      <Block className="text-align-center">
        <div style={{ marginBottom: "25px" }}>
          <img height="450px" src={bluecard} />
        </div>
        <div className="display-inline-block">
          <Buttom fill={true}>Login with google</Buttom>
        </div>
      </Block>
    </Page>
  );
}

export default HomePage;
