import React from "react";
import { BlockTitle, Block, Button, Preloader } from "framework7-react";
import { IGuessingForm } from "../../types/game.types";

function GuessingForm({
  isPlayerUpdating,
  handleGuessIsEven,
  isEven,
  isGameStateUpdating,
}: IGuessingForm) {
  return (
    <>
      <BlockTitle medium className="text-align-center">
        {isEven !== null
          ? "Guess is even or odd  number."
          : "Your oponent make a guess, wait a little."}
      </BlockTitle>
      {isEven !== null ? (
        <Block>
          <Button
            className="margin-bottom-half"
            type="button"
            fillMd
            colorTheme="green"
            text="even"
            onClick={() => handleGuessIsEven(true)}
            disabled={isGameStateUpdating || isPlayerUpdating}
          />
          <Button
            type="button"
            fillMd
            colorTheme="blue"
            text="odd"
            onClick={() => handleGuessIsEven(false)}
            disabled={isGameStateUpdating || isPlayerUpdating}
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

export default GuessingForm;
