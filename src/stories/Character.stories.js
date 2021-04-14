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
  maxHP: 48,
  hp: 36,
};
