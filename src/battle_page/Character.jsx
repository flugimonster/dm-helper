import React from 'react';
import PropTypes from 'prop-types';
import css from './Character.module.scss'
import clsx from 'clsx'

export const Character = ({name, image, maxHP, hp, faction, variant}) => {
  return <div className={clsx([css.cardContainer, css[variant], css[faction]])}>
    <div className={css.characterName}>{name}</div> 
    <img className={css.avatar} src={image}/>
    <div className={css.characterInfo}>{hp} / {maxHP}</div>
  </div>;
};

Character.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  maxHP: PropTypes.number.isRequired,
  hp: PropTypes.number.isRequired,
  faction: PropTypes.oneOf(['ally', 'enemy', 'neutral']).isRequired,
  variant: PropTypes.oneOf(['horizontal', 'vertical']),
};

Character.defaultProps = {
  variant: 'horizontal',
};
