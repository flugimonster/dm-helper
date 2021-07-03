import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


export function ActionCell({ row, updateData }) {
  const {
    faction,
    hp,
    maxHP,
    showDead = false,
    showCritical = false,
    hidden = false,
  } = row.original;
  return (
    <div>
      <>
        {faction === "party" && +hp === 0 && (
          <>
            <FormControlLabel
              control={<Checkbox color="primary" name="Dead" checked={showDead} onChange={() => {
                updateData(row.index, "showDead", !showDead);
              }} />}
              label="Dead"
            />
          </>
        )}
      </>
      {faction !== "party" && +hp < maxHP / 3 && (
        <>
          <FormControlLabel
            label="Critical"
          control={<Checkbox
              color="primary" name="showCriticalEnemy" checked={showCritical} onChange={() => {
                updateData(row.index, "showCritical", !showCritical);
              }} />}
          />
        </>
      )}
      {hidden && (
        <>
          <Button variant="contained" onClick={() => updateData(row.index, "hidden", false)}>
            Reshow
          </Button>
        </>
      )}
    </div>
  );
}
