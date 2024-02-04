'use client'

import Styles from "./styles/home.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { Pokemon } from "./types/types.d";
import Loader from "./components/Loader";
import Link from "next/link";
import { usePokemons } from "./context/pokemonContext";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100); // Ajusta el tamaño de la página según tus necesidades
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]); //useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pokemonData = usePokemons()
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Muestra el botón cuando el scroll llega a cierta posición
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
   
    const filteredList = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemonList(filteredList);
    // Si query está en blanco, utiliza la paginación normal; de lo contrario, muestra todos los resultados en una página
    setPageSize(query === "" ? 100 : filteredList.length);
    setIsLoading(false);
  }, [query, pokemonData]);

  // Lista de pokemons paginada
  const paginatedPokemons = filteredPokemonList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) {
    console.log("Loading")
    return <Loader />;
  }

  return (
    <main className={Styles.main}>
      <Header query={query} setQuery={setQuery} />
      <div className={Styles.description}>
        <div className={Styles.buttonsNav}>
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className={Styles.buttonLeft}>
            <Image src="/images/arrow.svg" alt="Arrow" width={30} height={30} />
          </button>
          <span className={Styles.pageInfo}> Página {currentPage} de {Math.ceil(filteredPokemonList.length / pageSize)} </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage * pageSize >= filteredPokemonList.length}
            className={Styles.buttonRight}>
            <Image src="/images/arrow.svg" alt="Arrow" width={30} height={30} />
          </button>
        </div>

        {query !== "" ? (
          <div className={Styles.grid}>
            {filteredPokemonList.map((pokemon, index) => (
              <Link key={index} href={`/${pokemon.id}`} className={Styles.card}>
                  <img
                    src={pokemon.gifSrc}
                    alt={pokemon.name}
                    className={Styles.image}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement; // Hacer un type casting explícito
                      target.onerror = null; 
                      target.src = '/assets/pokeball.svg'; // Ruta de la imagen alternativa
                    }}
                  />
                <h1 className={Styles.name} >{pokemon.name}</h1>
              </Link>

            ))}
          </div>
        ) : (
          <div className={Styles.grid}>
            {paginatedPokemons.map((pokemon, index) => (
              <div key={index} className={Styles.card} >
                <Link key={index} href={`/${pokemon.id}`} className={Styles.card}>
                  <img
                    src={pokemon.gifSrc}
                    alt={pokemon.name}
                    className={Styles.image}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement; // Hacer un type casting explícito
                      target.onerror = null; 
                      target.src = '/assets/pokeball.svg'; // Ruta de la imagen alternativa
                    }}
                  />
                  <h1 className={Styles.name} >{pokemon.name}</h1>
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
      {showScrollButton && (
        <button onClick={scrollToTop} className={Styles.scrollButton}>
          <Image src="/images/arrow.svg" alt="Arrow" width={50} height={50} />
        </button>
      )}
    </main>
  );
}
