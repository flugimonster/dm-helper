import jonjonImg from '../assets/JonJonImage.JPG'
import sindriImg from '../assets/SindiImage.JPG'
import regiImg from '../assets/RegiImage.jpg'
import dezImg from '../assets/DezImage.JPG'
// import iceTrollImg from '../assets/IceTroll.JPG'
// import roperImg from '../assets/Roper.JPG'
// import frostGiantImg from '../assets/FrostGiant.JPG'
import ironGolem from '../assets/IronGolem.JPG'
import clayGolem from '../assets/ClayGolem.JPG'
import silverDragon from '../assets/YoungSilverDragon.JPG'
import stoneGiant from '../assets/StoneGiant.JPG'

export const characters = [
  {
    name: 'JonJon',
    image: jonjonImg,
    faction: 'ally',
    maxHP: 48,
    hp: 48,
    initiative: 22,
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
    initiative: 8,
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
    initiative: 15,
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
    initiative: 5,
    toHit: '-',
    ac: 14,
    dc: 13,
  },
  {
    name: 'Clay Golem',
    image: clayGolem,
    faction: 'enemy',
    maxHP: 133,
    hp: 133,
    initiative: 17,
    toHit: '-',
    ac: 14,
    dc: '15 con',
  },
  {
    name: 'Iron Golem',
    image: ironGolem,
    faction: 'enemy',
    maxHP: 210,
    hp: 210,
    initiative: 2,
    toHit: '-',
    ac: 20,
    dc: '-',
  },
  {
    name: 'Stone Giant',
    image: stoneGiant,
    faction: 'enemy',
    maxHP: 126,
    hp: 126,
    initiative: 20,
    toHit: '-',
    ac: 17,
    dc: '-',
  },
  {
    name: 'Silver Dragon',
    image: silverDragon,
    faction: 'enemy',
    maxHP: 168,
    hp: 168,
    initiative: 13,
    toHit: '-',
    ac: 18,
    dc: '17 con',
  }
]