//@ts-nocheck
import React from "react";
import { Popover, BlockTitle, Block, Button, Input } from "framework7-react";

function MakeGuessForm({
  handleGuessingNumberChange,
  handleGuessingNumberSumbit,
  openMakeGuessPopover,
}) {
  return (
    <Popover
      closeByOutsideClick={false}
      closeByBackdropClick={false}
      opened={openMakeGuessPopover}
    >
      <BlockTitle medium className="text-align-center">
        Make a number guess
      </BlockTitle>
      <Block>
        <Input
          onChange={handleGuessingNumberChange}
          placeholder="1053854"
          style={{ padding: "7px 0 7px 0px" }}
          className="margin-bottom"
          outline
          type="number"
        />
        <Button
          onClick={handleGuessingNumberSumbit}
          type="button"
          fillMd
          colorTheme="green"
          text="Submit"
        />
      </Block>
    </Popover>
  );
}

export default MakeGuessForm;
