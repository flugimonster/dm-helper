import React from 'react';

export function ActionCell({ row, updateData }) {

    const { faction, hp, showDead } = row.original;
    return <div>
        {(faction === 'ally' && +hp === 0) &&
        <>
            <input
                type="checkbox"
                id="showDeadAlly"
                name='showDeadAlly'
                defaultChecked={showDead}
                onChange={() => {
                    updateData(row.index, 'showDead', !showDead)
                }}  />
            <label for="showDeadAlly"> Ally</label>
        </>
    }</div>
}