import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'
import css from './ListOfCharacters.module.scss';

import { Character } from './Character.jsx';
import { useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

// import {data} from './data';

export const ListOfCharacters = ({ characters, variant }) => {

    const [currTurn, setCurrTurn] = useState(0);

    const [sortedCharacters, setSortedCharacters] = useState(
        [...characters].sort(
            (a, b) => a.initiative < b.initiative ? 1 : -1
        )
    );


    useEffect(() => {
        ipcRenderer.on('turn', (e, a) => {
            setCurrTurn((currTurn + a + sortedCharacters.length) % sortedCharacters.length)
        })
        return () => ipcRenderer.removeAllListeners('turn')
    }, [currTurn]);

    useEffect(() => {
        ipcRenderer.on('hp', (e, a) => {
            sortedCharacters.find((c) => c.name === a.name)[a.field] = a.value;
            setSortedCharacters([...sortedCharacters]);
        })
        return () => ipcRenderer.removeAllListeners('hp')
    }, [sortedCharacters]);

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


