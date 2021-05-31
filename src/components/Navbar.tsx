import React from "react";

//Components
import { Navbar, NavRight, Button } from "framework7-react";

function MainNavbar() {
  return (
    <Navbar title="Number Guessing Game">
      <NavRight>
        <Button style={{ marginRight: "20px" }} fill>
          Login with Google
        </Button>
      </NavRight>
    </Navbar>
  );
}

export default MainNavbar;
