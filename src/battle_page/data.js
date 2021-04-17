import jonjonImg from '../assets/JonJonImage.JPG'
import sindriImg from '../assets/SinriImage.JPG'
import regiImg from '../assets/RegiImage.JPG'
import dezImg from '../assets/DezImage.JPG'

export const charactersData = [
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
        image: genericEnemyImg,
        faction: 'ally',
        maxHP: 59,
        hp: 59,
        highlight: false,
        initiative: 15,
      },
      {
        name: 'Enemy 2',
        image: genericEnemyImg,
        faction: 'ally',
        maxHP: 59,
        hp: 59,
        highlight: false,
        initiative: 13,
      },
      {
        name: 'Enemy 3',
        image: genericEnemyImg,
        faction: 'ally',
        maxHP: 36,
        hp: 36,
        highlight: false,
        initiative: 17,
      }
]