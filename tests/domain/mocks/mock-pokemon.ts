import { Pokemon } from '@/domain/models'
import { AddPokemon } from '@/domain/usecases'

import { datatype, random } from 'faker'

export const mockPokemonModel = (): Pokemon.Model => ({
  id: datatype.number(),
  tipo: random.arrayElement([
    Pokemon.PokemonType.CHARIZARD,
    Pokemon.PokemonType.MEWTWO,
    Pokemon.PokemonType.PIKACHU
  ]),
  treinador: random.words(),
  nivel: datatype.number()
})

export const mockAddPokemonParams = (): AddPokemon.Params => ({
  tipo: random.arrayElement([
    Pokemon.PokemonType.CHARIZARD,
    Pokemon.PokemonType.MEWTWO,
    Pokemon.PokemonType.PIKACHU
  ]),
  treinador: random.words()
})
