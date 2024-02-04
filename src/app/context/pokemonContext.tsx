'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchPokemons } from '../api/fetchPokemons'; // Importa la función fetchPokemons
import { Pokemon } from '../types/types.d'; // Importa el tipo Pokemon

// Define el tipo del contexto para el estado global de los pokemons
type PokemonContextType = Pokemon[];

// Crea un contexto para el estado global de los pokemons
const PokemonContext = createContext<PokemonContextType>([]);

// Proveedor que envuelve toda la aplicación para proporcionar el contexto
export function PokemonProvider({ children }: { children: ReactNode }) {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]); // Inicializa el estado con un array vacío
 
    useEffect(() => {
        // Llama a la función fetchPokemons y actualiza el estado con la respuesta
        fetchPokemons()
            .then((data) => setPokemons(data))
            .catch((error) => console.error('Error al obtener los pokemons:', error));
            
    }, []); // El segundo argumento vacío asegura que el efecto se ejecute solo una vez

    // Proporciona el estado de los pokemons a los componentes hijos
    return (
        <PokemonContext.Provider value={pokemons}>
            {children}
        </PokemonContext.Provider>
    );
}

// Hook personalizado para acceder al contexto de los pokemons
export function usePokemons(): Pokemon[] {
    const pokemonData = useContext(PokemonContext); 
    return pokemonData;
}