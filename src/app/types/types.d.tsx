type PokemonBasicInfo = {
    name: string;
    id: string;
    imgSrc: string;
  };
  
 type PokemonDetails = {
    hp: number;
    attack: number;
    defense: number;
  };

  export type Pokemon = PokemonBasicInfo & PokemonDetails   
