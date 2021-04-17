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
        hp: 48,
        highlight: true,
        initiative: 16,
      },
      {
        name: 'Sindri',
        image: sindriImg,
        faction: 'ally',
        maxHP: 56,
        hp: 56,
        highlight: false,
        initiative: 18,
      },
      {
        name: 'Reginald',
        image: regiImg,
        faction: 'ally',
        maxHP: 61,
        hp: 61,
        highlight: false,
        initiative: 13,
      },
      {
        name: 'Dez-Mon',
        image: dezImg,
        faction: 'ally',
        maxHP: 43,
        hp: 43,
        highlight: false,
        initiative: 1,
      },
      {
        name: 'Enemy 1',
        image: iceTrollImg,
        faction: 'enemy',
        maxHP: 115,
        hp: 1,
        highlight: false,
        initiative: 15,
      },
      {
        name: 'Enemy 2',
        image: roperImg,
        faction: 'enemy',
        maxHP: 93,
        hp: 51,
        highlight: false,
        initiative: 13,
      },
      {
        name: 'Enemy 3',
        image: frostGiantImg,
        faction: 'enemy',
        maxHP: 138,
        hp: 50,
        highlight: false,
        initiative: 17,
      }
]