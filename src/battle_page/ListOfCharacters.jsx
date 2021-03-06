import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import css from "./ListOfCharacters.module.scss";

import { Character } from "./Character.jsx";
import { useMemo } from "react";

export const ListOfCharacters = ({ characters, variant }) => {
  const sortedCharacters = useMemo(
    () =>
      [...characters].sort(
        (a, b) => (b?.initiative ?? 0) - (a?.initiative ?? 0)
      ),
    [characters]
  );
  
  return (
    <div>
      <div className={clsx([css.container, css[variant]])}>
        {sortedCharacters.map((char, idx) => (
          <Character
            key={char.uuid}
            variant={variant}
            highlight={char.highlight}
            name={char.name}
            image={char.image}
            maxHP={char.maxHP}
            hp={char.hp}
            faction={char.faction}
            showDead={char.showDead}
            showCritical={char.showCritical}
            conditions={char.conditions}
          />
        ))}
      </div>
    </div>
  );
};

ListOfCharacters.propTypes = {
  characters: PropTypes.any.isRequired,
  variant: PropTypes.oneOf(["horizontal", "vertical"]),
};
