//@ts-nocheck
import React from "react";
import { BlockTitle, Block, Button } from "framework7-react";

function LoserForm({ f7router }) {
  return (
    <>
      <BlockTitle medium className="text-align-center">
        Next time will be better
      </BlockTitle>
      <Block>
        <Button
          onClick={() => f7router.navigate("/")}
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
