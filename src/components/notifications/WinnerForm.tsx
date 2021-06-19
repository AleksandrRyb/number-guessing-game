//@ts-nocheck
import React from "react";
import { BlockTitle, Block, Button } from "framework7-react";

function WinnerForm({ setCloseGamePopover, player, f7router }) {
  function closeGame() {
    setCloseGamePopover(false);
    f7router.navigate("/");
  }

  return (
    <>
      <BlockTitle medium className="text-align-center">
        Congratulations {player.profile.name}! You are won.
      </BlockTitle>
      <Block>
        <Button
          onClick={closeGame}
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
