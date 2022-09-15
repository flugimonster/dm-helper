const jonjonImg = "/Users/tomerflug/dm-helper/src/assets/JonJonImage.JPG";
const sindriImg = "/Users/tomerflug/dm-helper/src/assets/SindiImage.JPG";
const regiImg = "/Users/tomerflug/dm-helper/src/assets/RegiImage.jpg";
const dezImg = "/Users/tomerflug/dm-helper/src/assets/DezImage.JPG";
// import iceTrollImg from '/Users/tomerflug/dm-helper/src/assets/IceTroll.JPG'
// import roperImg from '/Users/tomerflug/dm-helper/src/assets/Roper.JPG'
// import frostGiantImg from '/Users/tomerflug/dm-helper/src/assets/FrostGiant.JPG'
const dormund = "/Users/tomerflug/dm-helper/src/assets/dormund.JPG";
// import clayGolem from "/Users/tomerflug/dm-helper/src/assets/ClayGolem.JPG";
// import silverDragon from "/Users/tomerflug/dm-helper/src/assets/YoungSilverDragon.JPG";
// import stoneGiant from "/Users/tomerflug/dm-helper/src/assets/StoneGiant.JPG";

export const characters = [
  {
    name: "JonJon",
    image: jonjonImg,
    faction: "party",
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
    faction: "party",
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
    faction: "party",
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
    faction: "party",
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
