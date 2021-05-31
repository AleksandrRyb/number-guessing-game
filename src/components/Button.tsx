import React from "react";

//Components
import { Button } from "framework7-react";

//Types
type IButton = {
  children: string;
  fill: boolean;
};

function MainButton({ children, fill }: IButton) {
  return <Button fill={fill}>{children}</Button>;
}

export default MainButton;
