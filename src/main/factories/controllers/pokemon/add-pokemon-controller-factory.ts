import { makeAddPokemon } from '@/main/factories/usecases'
import { makeAddPokemonValidation } from '@/main/factories/validations'
import { AddPokemonController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeAddPokemonController = (): Http.Controller => {
  const validation = makeAddPokemonValidation()
  const addPokemon = makeAddPokemon()
  return new AddPokemonController(validation, addPokemon)
}
