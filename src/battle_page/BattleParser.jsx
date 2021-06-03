import react from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router'
import { characters } from './data';
import { ListOfCharacters } from './ListOfCharacters';
const { ipcRenderer, remote } = window.require('electron');



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const BattleParser = () => {
  let q = useQuery();

  const [characters, setCharacters] = useState();
  const [variant, setVariant] = useState('vertical');

  useEffect(() => {
    setCharacters(JSON.parse(q.get('data')));
  }, []);

  useEffect(() => {
    const { width, height } = remote.screen.getPrimaryDisplay().bounds;
    const IMAGE_HEIGHT = 233;
    const IMAGE_WIDTH = 170;
    if (characters) {
      const [x, y] = variant === 'vertical' ? [IMAGE_HEIGHT, IMAGE_WIDTH * characters.length] : [IMAGE_WIDTH * characters.length, IMAGE_HEIGHT]
      remote.getCurrentWindow().setSize(Math.min(x, width), Math.min(y, height));
    }
  }, [variant, characters])

  useEffect(() => {
    ipcRenderer.on('dataUpdate', (e, a) => {
      setCharacters(a.data);
    })
    return () => ipcRenderer.removeAllListeners('hp');
  }, [setCharacters])

  useEffect(() => {
    ipcRenderer.on('variant', (e, a) => {
      setVariant(a.variant);
    })
    return () => ipcRenderer.removeAllListeners('variant');
  }, [setVariant])

  return <>
    {characters && <ListOfCharacters variant={variant} characters={characters} />}
  </>

}