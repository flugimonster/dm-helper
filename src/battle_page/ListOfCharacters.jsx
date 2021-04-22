import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'
import css from './ListOfCharacters.module.scss';

import { Character } from './Character.jsx';
import { useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

// import {data} from './data';

export const ListOfCharacters = ({ characters, variant }) => {

    const sortedCharacters = [...characters].sort((a, b) => a.initiative < b.initiative ? 1 : -1)

    const [currTurn, setCurrTurn] = useState(0);

    useEffect(() => {
        ipcRenderer.on('turn', (e, a) => {
            setCurrTurn((currTurn + a + sortedCharacters.length) % sortedCharacters.length)
        })
        return () => ipcRenderer.removeAllListeners()
    }, [currTurn]);

    return <div>
        <div className={clsx([css.container, css[variant]])}>
            {
                sortedCharacters.map((char, idx) =>
                    <Character key={char.name} variant={variant} highlight={idx === currTurn} name={char.name} image={char.image} maxHP={char.maxHP} hp={char.hp} faction={char.faction} />
                )
            }
        </div>
    </div>
}

ListOfCharacters.propTypes = {
    characters: PropTypes.any.isRequired,
    variant: PropTypes.oneOf(['horizontal', 'vertical']),
};

ListOfCharacters.defaultProps = {
    variant: 'vertical',
};


