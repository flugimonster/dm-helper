import React from 'react';
import PropTypes from 'prop-types';
import css from './Character.module.scss';
import clsx from 'clsx';
import genericEnemyImg from '../assets/GenericImage.jpg'
import skullImg from '../assets/Skull.JPG'
import { useEffect } from 'react';
import { useRef } from 'react';


export const Character = ({ name, image, maxHP, hp, faction, variant, highlight, showDead = false }) => {
  const elem = useRef();

  useEffect(() => {
    if (highlight) {
      elem.current.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
    }
  }, [highlight])
  
  return <div ref={elem} className={
    clsx(
      [css.cardContainer,
      css[variant],
      css[faction],
      {
        [css.critical]: hp / maxHP < 0.33 && hp > 0 && faction === 'ally',
        [css.dead]: hp <= 0 && (faction !== 'ally' || showDead),
        [css.dying]: hp <= 0 && faction === 'ally' && !showDead,
        [css.highlight]: highlight
      }]
    )
  }>
    <div className={css.characterName}>{name} {showDead ? 'a' : 'b'}</div>
    <div className={
      clsx(
        [css.avatarContainer,
          {
            [css.highlight]: highlight,
            // [css.skull]: skullImg
          }
        ]
        )
        }>
      <img className={css.avatar} src={image} />
    </div>
    <div className={css.characterInfo}>
      <div className={css.hp}>
        {/* {faction === 'ally' ? `${Math.max(hp, 0)} / ${maxHP}` : `${Math.min(hp - maxHP, 0)}`} */}
        {faction === 'ally' ? `${Math.max(hp, 0)} / ${maxHP}` : `???`}

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
