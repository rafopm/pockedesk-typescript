

const pokemonDetails = ({ params }: { params: { pokemonId: string } }) => {

  console.log(params)
  return (
    <div>Pokemon {params.pokemonId}</div>
  )
}

export default pokemonDetails;
