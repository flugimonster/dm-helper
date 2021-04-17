import React from 'react';
import PropTypes from 'prop-types';
import css from './Character.module.scss';
import clsx from 'clsx';
import genericEnemyImg from '../assets/GenericImage.jpg'


export const Character = ({ name, image, maxHP, hp, faction, variant, highlight }) => {
  console.log(clsx(
    [css.cardContainer,
    css[variant],
    css[faction],
    {
      [css.critical]: hp / maxHP < 0.33 && hp > 0,
      [css.dead]: hp <= 0,
      [css.highlight]: highlight
    }]
  ))
  
  return <div className={
    clsx(
      [css.cardContainer,
      css[variant],
      css[faction],
      {
        [css.critical]: hp / maxHP < 0.33 && hp > 0,
        [css.dead]: hp <= 0,
        [css.highlight]: highlight
      }]
    )
  }>
    <div className={css.characterName}>{name}</div>
    <div className={css.avatarContainer}>
      <img className={css.avatar} src={image} />

    </div>
    <div className={css.characterInfo}>
      <div className={css.hp}>
        {faction === 'ally' ? `${Math.max(hp, 0)} / ${maxHP}` : `${Math.max(hp - maxHP, 0)}`}
      </div>
    </div>
  </div>;
};

Character.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  maxHP: PropTypes.number.isRequired,
  hp: PropTypes.number.isRequired,
  faction: PropTypes.oneOf(['ally', 'enemy', 'neutral']).isRequired,
  variant: PropTypes.oneOf(['horizontal', 'vertical']),
  highlight: PropTypes.bool,
};

Character.defaultProps = {
  variant: 'horizontal',
  image: genericEnemyImg,
};
