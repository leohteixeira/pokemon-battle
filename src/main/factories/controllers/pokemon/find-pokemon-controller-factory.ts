import { makeFindPokemon } from '@/main/factories/usecases'
import { makeFindPokemonValidation } from '@/main/factories/validations'
import { FindPokemonController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeFindPokemonController = (): Http.Controller => {
  const validation = makeFindPokemonValidation()
  const findPokemon = makeFindPokemon()
  return new FindPokemonController(validation, findPokemon)
}
