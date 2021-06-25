import React from "react";

import { ListOfCharacters } from "../battle_page/ListOfCharacters";

import { characters } from "../battle_page/data";

export default {
  title: "Battle/ListOfCharacters",
  component: ListOfCharacters,
};

const Template = (args) => (
  <div style={{ height: 600 }}>
    <ListOfCharacters {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  characters,
};
