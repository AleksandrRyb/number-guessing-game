//@ts-nocheck
import React from "react";
import { BlockTitle, Block, Button } from "framework7-react";

function LoserForm({ setCloseGamePopover, f7router }) {
  function closeGame() {
    setCloseGamePopover(false);
    f7router.navigate("/");
  }

  return (
    <>
      <BlockTitle medium className="text-align-center">
        Next time will be better
      </BlockTitle>
      <Block>
        <Button
          onClick={closeGame}
          type="button"
          text="Home"
          colorTheme="yellow"
          fillMd
        />
      </Block>
    </>
  );
}

export default LoserForm;
