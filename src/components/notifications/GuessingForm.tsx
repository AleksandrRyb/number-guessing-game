//@ts-nocheck
import React from "react";
import { BlockTitle, Block, Button, Preloader } from "framework7-react";

function GuessingForm({
  openGuessingPopover,
  handleGuessIsEven,
  isEven,
  isGameStateUpdating,
}) {
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
          />
          <Button
            type="button"
            fillMd
            colorTheme="blue"
            text="odd"
            onClick={() => handleGuessIsEven(false)}
          />
        </Block>
      ) : (
        <Block className="text-align-center">
          <Preloader color="blue" />
        </Block>
      )}
    </>
  );
}

export default GuessingForm;
