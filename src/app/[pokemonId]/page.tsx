'use client'
import { Pokemon } from '../types/types.d';
import { usePokemons } from "../context/pokemonContext";
import { useContext, useEffect, useState } from 'react';
import Styles from '../styles/pokemonid.module.css';
import Image from 'next/image';
import Loader from '../components/Loader';

const PokemonDetails = ({ params }: { params: { pokemonId: string } }) => {
  const pokemonData = usePokemons();
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon | null>(null); // Define el estado para el pokemonInfo


  useEffect(() => {
    // Filtrar el pokemonData por el pokemonId y establecer el pokemonInfo
    const selectedPokemon = pokemonData.find((pokemon) => pokemon.id === params.pokemonId);
    setPokemonInfo(selectedPokemon ?? null); // Utiliza el operador de encadenamiento opcional para manejar el valor potencialmente undefined
  }, [params.pokemonId, pokemonData]);

  if (!pokemonInfo) {
    return <div><Loader /></div>;
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <div className={Styles.name}>{pokemonInfo.name}</div>
        <div className={Styles.imageContainer}>
          <img
            src={pokemonInfo.imgSrc}
            alt={pokemonInfo.name}
            className={Styles.image}
            onError={(e) => {
              const target = e.target as HTMLImageElement; // Hacer un type casting explícito
              target.onerror = null; 
              target.src = '/assets/pokeball.svg'; // Ruta de la imagen alternativa
            }}
          />
        </div>
        <div className={Styles.imageSign}>
          <Image src="/images/speed.svg" alt="Atack" width={64} height={36} style={{ width: "90px" }} />
          <Image src="/images/hp.svg" alt="Hp" width={51} height={51} style={{ width: "90px" }} />
          <Image src="/images/defense.svg" alt="Defense" width={42} height={51} style={{ width: "90px" }} />
        </div>
        <div className={Styles.stats}>
          <span style={{ width: "90px" }}>{pokemonInfo.attack}</span>
          <span style={{ width: "90px" }}>{pokemonInfo.hp}</span>
          <span style={{ width: "90px" }}>{pokemonInfo.defense}</span>
        </div>
        <div className={Styles.statsDescription}>
          <span style={{ width: "90px" }}>Attack</span>
          <span style={{ width: "90px" }}>HP</span>
          <span style={{ width: "90px" }}>Defense</span>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails;
