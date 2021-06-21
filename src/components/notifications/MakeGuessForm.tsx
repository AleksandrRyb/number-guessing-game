import React from "react";
import { BlockTitle, Block, Button, Input, Preloader } from "framework7-react";
import { IMakeGuessForm } from "../../types/game.types";

function MakeGuessForm({
  isGameStateUpdating,
  handleGuessingNumberChange,
  handleGuessingNumberSumbit,
  isEven,
}: IMakeGuessForm) {
  return (
    <>
      <BlockTitle medium className="text-align-center">
        {isEven === null
          ? "Make a number guess."
          : "Waiting for your opponent response."}
      </BlockTitle>
      {isEven === null ? (
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
            disabled={isGameStateUpdating}
          />
        </Block>
      ) : (
        <Block className="text-align-center">
          <Preloader colorTheme="blue" />
        </Block>
      )}
    </>
  );
}

export default MakeGuessForm;
