//@ts-nocheck
import React from "react";
import { BlockTitle, Block, Preloader } from "framework7-react";

function WaitingForm() {
  return (
    <>
      <BlockTitle medium className="text-align-center">
        Waiting for you turn!
      </BlockTitle>
      <Block className="text-align-center">
        <Preloader color="blue" />
      </Block>
    </>
  );
}

export default WaitingForm;
