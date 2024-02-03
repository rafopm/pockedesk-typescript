// Importa el tipo Pokemon desde el archivo de definición de tipos types.d
import { Pokemon } from "../types/types.d";
import { IMAGE_PATH } from "../lib/constants";
import { formatName } from "../lib/utils";
// URL de la API que proporciona información sobre los Pokémon
const apiUrl = "https://unpkg.com/pokemons@1.1.0/pokemons.json";

// Interfaz que define la estructura de la respuesta de la API
interface PokemonApiResponse {
    results: {
        name: string;
        national_number: string;
        hp: number;
        attack: number,
        defense: number,
        sprites: {
            large: string;
            animated?: string;
        }
    }[];
}

/**
 * Función asincrónica para obtener datos de la API de Pokémon.
 * @returns Una promesa que resuelve a un array de objetos Pokemon.
 * @throws {Error} Si hay un error al obtener o procesar los datos de la API.
 */
export async function fetchPokemons(): Promise<Pokemon[]> {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data: PokemonApiResponse = await response.json();
            const uniquePokemonsMap = new Map<string, Pokemon>();
            data.results.forEach((pokemon) => {
                const formattedName = formatName(pokemon.name.toLowerCase());
                const gifSrc = `${IMAGE_PATH}${formattedName}.gif`;
                const newPokemon: Pokemon = {
                    name: pokemon.name,
                    id: pokemon.national_number,
                    imgSrc: pokemon.sprites.large,
                    gifSrc,
                    hp: pokemon.hp,
                    attack: pokemon.attack,
                    defense: pokemon.defense,
                };
                uniquePokemonsMap.set(pokemon.national_number, newPokemon);
            });
            const uniquePokemons: Pokemon[] = Array.from(uniquePokemonsMap.values());
            return uniquePokemons;
        } else {
            console.error('Error al obtener datos de la API. Código de estado:', response.status);
            throw new Error('Error al obtener datos de la API');
        }
    } catch (error: any) {
        console.error('Error en la solicitud Fetch:', error.message);
        throw new Error('Error desconocido en la solicitud Fetch');
    }
}
