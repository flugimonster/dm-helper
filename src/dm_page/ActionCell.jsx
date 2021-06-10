import React from 'react';

export function ActionCell({ row, updateData }) {

    const { faction, hp, maxHP, showDead = false, showCritical = false, hidden = false } = row.original;
    return <div>
        <>
            {(faction === 'ally' && +hp === 0) &&
                <>
                    <input
                        type="checkbox"
                        id="showDeadAlly"
                        name='showDeadAlly'
                        defaultChecked={showDead}
                        onChange={() => {
                            updateData(row.index, 'showDead', !showDead)
                        }} />
                    <label for="showDeadAlly"> Dead</label>
                </>
            }
        </>
        {(faction !== 'ally' && +hp < maxHP / 3) &&
            <>
                <input
                    type="checkbox"
                    id="showCriticalEnemy"
                    name='showCriticalEnemy'
                    defaultChecked={showCritical}
                    onChange={() => {
                        updateData(row.index, 'showCritical', !showCritical)
                    }} />
                <label for="showCriticalEnemy">Show Critical</label>
            </>
        }
        {(hidden) &&
            <>
                <button onClick={() => updateData(row.index, 'hidden', false)
                }>Reshow</button>
            </>
        }
    </div>
}