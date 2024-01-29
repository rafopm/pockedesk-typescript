'use client'

import styles from "./page.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { fetchPokemons } from "./api/fetchPokemons";
import { Pokemon } from "./types/types.d";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const pokemons = await fetchPokemons();
        console.log('Pokemons:', pokemons);
        setPokemonList(pokemons);
      } catch (error: any) {
        console.error('Error al obtener pokemons:', error.message);
      }
    })();
  }, [])

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.description}>
        {
          pokemonList.map((pokemon, index) => (
            <div key={index}>
              <h1>{pokemon.name}</h1>
              <img src={pokemon.gifSrc} alt={pokemon.name} />

            </div>
          ))
        }
      </div>
      <Footer />
    </main>
  );
}
