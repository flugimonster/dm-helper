import React from 'react';

import { Character } from '../battle_page/Character';

import jonjonImg from '../assets/JonJonImage.JPG'
import dezImg from '../assets/DezImage.JPG'

export default {
  title: 'Battle/Character',
  component: Character,
};

const Template = (args) => <Character {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'JonJon',
  image: jonjonImg,
  faction: 'ally',
  maxHP: 48,
  hp: 36,
  highlight: true,
};

// export const Default = Template.bind({});
// Default.args = {
//   name: 'Dez-Mon',
//   image: dezImg,
//   faction: 'ally',
//   maxHP: 43,
//   hp: 43,
//   highlight: true,
// };

export const Dez = Template.bind({});
Dez.args = {
  ...Default.arg,
  name: 'Dez-Mon',
  image: dezImg,
  maxHP: 43,
  hp: 43,
}

export const Dying = Template.bind({});
Dying.args = {
  ...Default.args,
  hp: 10,
};

export const Dead = Template.bind({});
Dead.args = {
  ...Default.args,
  hp: 0,
};