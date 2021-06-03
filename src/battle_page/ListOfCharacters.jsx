import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'
import css from './ListOfCharacters.module.scss';

import { Character } from './Character.jsx';
import { useEffect } from 'react';
import { useMemo } from 'react';
const { ipcRenderer } = window.require('electron');


export const ListOfCharacters = ({ characters, variant }) => {

    const [currTurn, setCurrTurn] = useState(0);

    const sortedCharacters = useMemo(
        () => [...characters].sort(
            (a, b) =>  (b?.initiative ?? 0) - (a?.initiative ?? 0)
        ),
        [characters]
    );

    useEffect(() => {
        ipcRenderer.on('turn', (e, a) => {
            setCurrTurn((currTurn + a + sortedCharacters.length) % sortedCharacters.length)
        })
        return () => ipcRenderer.removeAllListeners('turn')
    }, [currTurn, sortedCharacters]);


    return <div>
        <div className={clsx([css.container, css[variant]])}>
            {
                sortedCharacters.map((char, idx) =>
                    <Character
                        key={char.name}
                        variant={variant}
                        highlight={idx === currTurn}
                        name={char.name}
                        image={char.image}
                        maxHP={char.maxHP}
                        hp={char.hp}
                        faction={char.faction}
                        showDead={char.showDead}
                        showCritical={char.showCritical}/>
                )
            }
        </div>
    </div>
}

ListOfCharacters.propTypes = {
    characters: PropTypes.any.isRequired,
    variant: PropTypes.oneOf(['horizontal', 'vertical']),
};
