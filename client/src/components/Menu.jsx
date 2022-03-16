import React from "react";
import { Div, Text, Button } from "../style/styled";

const Menu = () => {
  return (
    <Div alignSelf="stretch" direction="flex" alignItems="baseline">
      <Text style={{ marginRight: "60px" }}>Home</Text>
      <Text style={{ marginRight: "60px" }}>Matches</Text>
      <Text style={{ marginRight: "60px" }}>Teams</Text>
      <Button style={{ marginRight: "60px" }}>login</Button>
      <Button>Sign up</Button>
    </Div>
  );
};

export default Menu;
