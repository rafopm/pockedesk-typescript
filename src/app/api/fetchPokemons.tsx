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
            animated: string;
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
        // Realiza la solicitud Fetch a la API de Pokémon
        const response = await fetch(apiUrl);

        // Verifica si la respuesta de la API es exitosa (código de estado 200-299)
        if (response.ok) {
            // Parsea la respuesta a formato JSON
            const data: PokemonApiResponse = await response.json();

            // Mapea los datos de la API a objetos Pokemon
            const pokemons: Pokemon[] = data.results.map((pokemon) => ({
                name: pokemon.name,
                id: pokemon.national_number,
                imgSrc: pokemon.sprites.large,
                gifSrc: `${IMAGE_PATH}${formatName(
                    pokemon.name.toLowerCase()
                )}.gif`,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
            }));
            // Devuelve el array de Pokémon únicos
            return pokemons;
        } else {
            // Maneja errores para códigos de estado no exitosos
            console.error('Error al obtener datos de la API. Código de estado:', response.status);
            throw new Error('Error al obtener datos de la API');
        }
    } catch (error: any) {
        // Maneja errores generales, como problemas de red
        console.error('Error en la solicitud Fetch:', error.message);
        throw new Error('Error desconocido en la solicitud Fetch');
    }
}