import React from "react";
import PropTypes from "prop-types";
import css from "./Character.module.scss";
import clsx from "clsx";
import genericEnemyImg from "../assets/GenericImage.jpg";
import { useEffect, useRef, useMemo } from "react";
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import skull from '../assets/Skull.JPG'

const { nativeImage } = window.require('electron');

export const Character = ({
  name,
  image,
  maxHP = 1,
  hp = 1,
  faction,
  variant = "vertical",
  highlight,
  showDead = false,
  showCritical = false,
  hasConditions = false,
}) => {
  const elem = useRef();

  const avatarImage = useMemo(() => image ? nativeImage.createFromPath(image).toDataURL() : genericEnemyImg, [image]);

  useEffect(() => {
    if (highlight) {
      elem.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [highlight]);

  const isDead = hp <= 0 && (faction !== "party" || showDead);

  return (
    <div
      ref={elem}
      className={clsx([
        css.cardContainer,
        css[variant],
        css[faction],
        {
          [css.critical]:
            (hp / maxHP < 0.33 && hp > 0 && faction === "party") || showCritical,
          [css.dying]: hp <= 0 && faction === "party" && !showDead,
          [css.highlight]: highlight,
        },
      ])}
    >
      <Badge badgeContent={name}
        color="primary"
        overlap="circle"
      >
        <Badge badgeContent={`${hp} / ${maxHP}`}
          color="primary" invisible={faction !== 'party'}
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}>
          <Badge badgeContent={hasConditions}
            invisible={!hasConditions}
            color="error"
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Avatar style={{}} alt="" src={!isDead ? avatarImage : skull} className={css.avatar} />
          </Badge>
        </Badge>
      </Badge>
    </div >
  );
};

Character.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  maxHP: PropTypes.number.isRequired,
  hp: PropTypes.number.isRequired,
  faction: PropTypes.oneOf(["party", "enemy", "neutral"]).isRequired,
  variant: PropTypes.oneOf(["horizontal", "vertical"]),
  highlight: PropTypes.bool,
};
