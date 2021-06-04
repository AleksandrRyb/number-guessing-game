import React from "react";

import { Card, CardContent, BlockTitle, Input, Button } from "framework7-react";

function PlayerMessage() {
  return (
    <Card>
      <CardContent className="text-align-center margin-bottom">
        <BlockTitle medium>Guess the number</BlockTitle>
        <Input
          className="margin-bottom margin-top"
          placeholder="enter the number"
          type="number"
        />
        <Button text="submit" fill />
      </CardContent>
    </Card>
  );
}

export default PlayerMessage;
