import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'
import css from './ListOfCharacters.module.scss';

import { Character } from './Character.jsx';

// import {data} from './data';


export const ListOfCharacters = ({ characters, variant }) => {
    const sortedCharacters = [...characters].sort((a, b) => a.initiative < b.initiative ? 1 : -1)

    const [currTurn, setCurrTurn] = useState(0);

    return <div>
        <div className={clsx([css.container, css[variant]])}>
            {
                sortedCharacters.map((char, idx) =>
                    <Character variant={variant} highlight={idx === currTurn} name={char.name} image={char.image} maxHP={char.maxHP} hp={char.hp} faction={char.faction} />
                )
            }
        </div>
        <button onClick={() => setCurrTurn((currTurn + 1) % sortedCharacters.length)}>Next Turn</button>
    </div>
}

ListOfCharacters.propTypes = {
    characters: PropTypes.any.isRequired,
    variant: PropTypes.oneOf(['horizontal', 'vertical']),
};

ListOfCharacters.defaultProps = {
    variant: 'horizontal',
};


