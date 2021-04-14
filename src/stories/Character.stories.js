import React from 'react';

import { Character } from '../battle_page/Character';

import jonjonImg from '../assets/JonJonImage.JPG'

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
};



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