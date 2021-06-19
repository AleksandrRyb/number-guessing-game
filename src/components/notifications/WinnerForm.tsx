//@ts-nocheck
import React from "react";
import { BlockTitle, Block, Button } from "framework7-react";

function WinnerForm({ player, f7router }) {
  return (
    <>
      <BlockTitle medium className="text-align-center">
        Congratulations {player.profile.name}! You are won.
      </BlockTitle>
      <Block>
        <Button
          onClick={() => f7router.navigate("/")}
          type="button"
          text="Home"
          colorTheme="green"
          fillMd
        />
      </Block>
    </>
  );
}

export default WinnerForm;
