'use client'

import styles from "./page.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { fetchPokemons } from "./api/fetchPokemons";
import { Pokemon } from "./types/types.d";
import Loader from "./components/Loader";
import Link from "next/link";
import { usePokemons } from "./context/pokemonContext";

export default function Home() {
  const [query, setQuery] = useState("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100); // Ajusta el tamaño de la página según tus necesidades
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pokemonData = usePokemons()
  // Hook de efecto para cargar la lista de pokemons al montar el componente

  console.log('aa', pokemonData);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setIsLoading(true);
  //       const pokemons = await fetchPokemons();

  //       setPokemonList(pokemons);
  //       setIsLoading(false);
  //     } catch (error: any) {
  //       console.error('Error al obtener pokemons:', error.message);
  //     }
  //   })();
  // }, []);

  // Hook de efecto para filtrar la lista de pokemons cuando el valor de 'query' cambia

  useEffect(() => {
    const filteredList = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPokemonList(filteredList);

    // Si query está en blanco, utiliza la paginación normal; de lo contrario, muestra todos los resultados en una página
    setPageSize(query === "" ? 100 : filteredList.length);
  }, [query, pokemonData]);

  // Lista de pokemons paginada
  const paginatedPokemons = filteredPokemonList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading || pokemonData === null) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <Header query={query} setQuery={setQuery} />
      <div className={styles.description}>
        <div>
          <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>
            Anterior
          </button>
          <span> Página {currentPage} de {Math.ceil(filteredPokemonList.length / pageSize)} </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage * pageSize >= filteredPokemonList.length}
          >
            Siguiente
          </button>
        </div>

        {query !== "" ? (
          <div >
            {filteredPokemonList.map((pokemon, index) => (
              <div key={index} >
                <Link href={`/${pokemon.id}`}>
                  <h1>{pokemon.name}</h1>
                    <img src={pokemon.gifSrc} alt={pokemon.name} />
        
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {paginatedPokemons.map((pokemon, index) => (
              <div key={index}>
                <Link href={`/${pokemon.id}`}>
                  <h1>{pokemon.name}</h1>

                    <img src={pokemon.gifSrc} alt={pokemon.name} />
              
                </Link> 
              </div>
            ))}
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
}
