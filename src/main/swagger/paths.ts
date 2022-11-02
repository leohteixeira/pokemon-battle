import { pokemonsPath, pokemonsIdPath, pokemonBattlePath } from './paths/'

export default {
  '/pokemons': pokemonsPath,
  '/pokemons/{id}': pokemonsIdPath,
  '/pokemons/{pokemonAId}/{pokemonBId}': pokemonBattlePath
}
