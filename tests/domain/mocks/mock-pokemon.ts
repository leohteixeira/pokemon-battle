import { Pokemon } from '@/domain/models'
import { AddPokemon, BattlePokemon, EditPokemon } from '@/domain/usecases'

import { datatype, random } from 'faker'

export const mockPokemonModel = (): Pokemon.Model => ({
  id: datatype.number({ min: 1 }),
  tipo: random.arrayElement([
    Pokemon.PokemonType.CHARIZARD,
    Pokemon.PokemonType.MEWTWO,
    Pokemon.PokemonType.PIKACHU
  ]),
  treinador: random.words(),
  nivel: datatype.number()
})

export const mockPokemonBattleModel = (): BattlePokemon.Result => ({
  vencedor: mockPokemonModel(),
  perdedor: mockPokemonModel()
})

export const mockPokemonModels = (): Pokemon.Model[] => [
  mockPokemonModel(),
  mockPokemonModel()
]

export const mockAddPokemonParams = (): AddPokemon.Params => ({
  tipo: random.arrayElement([
    Pokemon.PokemonType.CHARIZARD,
    Pokemon.PokemonType.MEWTWO,
    Pokemon.PokemonType.PIKACHU
  ]),
  treinador: random.words()
})

export const mockEditPokemonParams = (): EditPokemon.Params => ({
  id: datatype.number({ min: 1 }),
  treinador: random.words()
})
