import jonjonImg from "../assets/JonJonImage.JPG";
import sindriImg from "../assets/SindiImage.JPG";
import regiImg from "../assets/RegiImage.jpg";
import dezImg from "../assets/DezImage.JPG";
// import iceTrollImg from '../assets/IceTroll.JPG'
// import roperImg from '../assets/Roper.JPG'
// import frostGiantImg from '../assets/FrostGiant.JPG'
import dormund from "../assets/dormund.JPG";
import clayGolem from "../assets/ClayGolem.JPG";
import silverDragon from "../assets/YoungSilverDragon.JPG";
import stoneGiant from "../assets/StoneGiant.JPG";

export const characters = [
  {
    name: "JonJon",
    image: jonjonImg,
    faction: "ally",
    maxHP: 48,
    hp: 48,
    initiative: 22,
    toHit: "-",
    ac: 18,
    dc: 16,
    uuid: 1,
  },
  {
    name: "Sindri",
    image: sindriImg,
    faction: "ally",
    maxHP: 56,
    hp: 56,
    initiative: 8,
    toHit: "-",
    ac: 18,
    dc: 15,
    uuid: 2,
  },
  {
    name: "Reginald",
    image: regiImg,
    faction: "ally",
    maxHP: 61,
    hp: 61,
    initiative: 15,
    toHit: "-",
    ac: 18,
    dc: "-",
    uuid: 3,
  },
  {
    name: "Dez-Mon",
    image: dezImg,
    faction: "ally",
    maxHP: 43,
    hp: 43,
    initiative: 5,
    toHit: "-",
    ac: 14,
    dc: 13,
    uuid: 4,
  },
  {
    name: "Dormund",
    image: dormund,
    faction: "enemy",
    maxHP: 210,
    hp: 210,
    initiative: 2,
    toHit: "-",
    ac: 21,
    dc: "-",
    uuid: 5,
  },
];
