import react from 'react';
import { useLocation } from 'react-router'
import { ListOfCharacters } from './ListOfCharacters';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const BattleParser = () => {
  let q = useQuery();
  return <ListOfCharacters variant='horizontal' characters={JSON.parse(q.get('data'))} />

}