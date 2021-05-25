import React from 'react';

export function ActionCell({ row, updateData }) {

    const { faction, hp, showDead } = row.original;
    return <div>{(faction === 'ally' && +hp === 0) &&
        <input
            type="checkbox"
            checked={showDead}
            onClick={() => {
                updateData(row.index, 'showDead', !showDead)
            }} />}</div>
}