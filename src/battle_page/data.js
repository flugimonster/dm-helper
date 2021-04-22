import jonjonImg from '../assets/JonJonImage.JPG'
import sindriImg from '../assets/SindiImage.JPG'
import regiImg from '../assets/RegiImage.jpg'
import dezImg from '../assets/DezImage.JPG'
import iceTrollImg from '../assets/IceTroll.JPG'
import roperImg from '../assets/Roper.JPG'
import frostGiantImg from '../assets/FrostGiant.JPG'


export const characters = [
  {
    name: 'JonJon',
    image: jonjonImg,
    faction: 'ally',
    maxHP: 48,
    hp: 0,
    initiative: 16,
    ac: 18,
    dc: 16,
  },
  {
    name: 'Sindri',
    image: sindriImg,
    faction: 'ally',
    maxHP: 56,
    hp: 43,
    initiative: 18,
    ac: 18,
    dc: 15,
  },
  {
    name: 'Reginald',
    image: regiImg,
    faction: 'ally',
    maxHP: 61,
    hp: 2,
    initiative: 13,
    ac: 18,
    dc: '-',
  },
  {
    name: 'Dez-Mon',
    image: dezImg,
    faction: 'ally',
    maxHP: 43,
    hp: 42,
    initiative: 1,
    ac: 14,
    dc: 13,
  },
  {
    name: 'Enemy 1',
    image: iceTrollImg,
    faction: 'enemy',
    maxHP: 115,
    hp: 1,
    initiative: 15,
    ac: 15,
    dc: '-',
  },
  {
    name: 'Enemy 2',
    image: roperImg,
    faction: 'enemy',
    maxHP: 93,
    hp: 0,
    initiative: 13,
    ac: 15,
    dc: '-',
  },
  {
    name: 'Enemy 3',
    image: frostGiantImg,
    faction: 'enemy',
    maxHP: 138,
    hp: 50,
    initiative: 17,
    ac: 15,
    dc: '-',
  }
]