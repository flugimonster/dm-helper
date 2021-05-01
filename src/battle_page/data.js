import jonjonImg from '../assets/JonJonImage.JPG'
import sindriImg from '../assets/SindiImage.JPG'
import regiImg from '../assets/RegiImage.jpg'
import dezImg from '../assets/DezImage.JPG'
// import iceTrollImg from '../assets/IceTroll.JPG'
// import roperImg from '../assets/Roper.JPG'
// import frostGiantImg from '../assets/FrostGiant.JPG'
import guardImg from '../assets/guard.JPG'
import mageImg from '../assets/mage.JPG'

export const characters = [
  {
    name: 'JonJon',
    image: jonjonImg,
    faction: 'ally',
    maxHP: 48,
    hp: 48,
    initiative: 16,
    toHit: '-',
    ac: 18,
    dc: 16,
  },
  {
    name: 'Sindri',
    image: sindriImg,
    faction: 'ally',
    maxHP: 56,
    hp: 56,
    initiative: 18,
    toHit: '-',
    ac: 18,
    dc: 15,
  },
  {
    name: 'Reginald',
    image: regiImg,
    faction: 'ally',
    maxHP: 61,
    hp: 61,
    initiative: 13,
    toHit: '-',
    ac: 18,
    dc: '-',
  },
  {
    name: 'Dez-Mon',
    image: dezImg,
    faction: 'ally',
    maxHP: 43,
    hp: 43,
    initiative: 13,
    toHit: '-',
    ac: 14,
    dc: 13,
  },
  {
    name: 'Guard 1',
    image: guardImg,
    faction: 'enemy',
    maxHP: 58,
    hp: 58,
    initiative: 15,
    toHit: '-',
    ac: 17,
    dc: '-',
  },
  {
    name: 'Guard 2',
    image: guardImg,
    faction: 'enemy',
    maxHP: 71,
    hp: 71,
    initiative: 1,
    toHit: '-',
    ac: 17,
    dc: '-',
  },
  {
    name: 'SpellCaster',
    image: mageImg,
    faction: 'enemy',
    maxHP: 42,
    hp: 42,
    initiative: 17,
    toHit: '-',
    ac: 13,
    dc: '-',
  }
]