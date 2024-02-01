
import { Pokemon } from '../types/types.d';

const pokemonDetails = ({ params }: { params: { pokemonId: string } }) => {

  console.log(params.pokemonId);
  return (
    <div>Pokemon {params.pokemonId}</div>
  )
}

export default pokemonDetails;
