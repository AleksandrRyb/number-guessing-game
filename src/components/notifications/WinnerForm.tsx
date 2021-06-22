import React from "react";
import { BlockTitle, Block, Button } from "framework7-react";
import { IWinnerForm } from "../../types/game.types";

function WinnerForm({ setCloseGamePopover, player, f7router }: IWinnerForm) {
  function closeGame() {
    setCloseGamePopover(false);
    f7router.navigate("/");
  }

  return (
    <>
      <BlockTitle medium className="text-align-center">
        {player?.profile.name}! You won.
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
