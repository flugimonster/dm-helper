import react from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router'
import { characters } from './data';
import { ListOfCharacters } from './ListOfCharacters';
const { ipcRenderer } = window.require('electron');



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const BattleParser = () => {
  let q = useQuery();
  const [characters, setCharacters] = useState();

  useEffect(() => {
    setCharacters(JSON.parse(q.get('data')))
  }, []);

  useEffect(() => {
    ipcRenderer.on('dataUpdate', (e, a) => {
      setCharacters(a.data)
    })
    return () => ipcRenderer.removeAllListeners('hp')
  }, [setCharacters])


  return <>
    { characters && <ListOfCharacters variant='horizontal' characters={characters} />}
  </>

}