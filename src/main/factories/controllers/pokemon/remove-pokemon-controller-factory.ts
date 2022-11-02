import { makeRemovePokemon } from '@/main/factories/usecases'
import { makeRemovePokemonValidation } from '@/main/factories/validations'
import { RemovePokemonController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeRemovePokemonController = (): Http.Controller => {
  const validation = makeRemovePokemonValidation()
  const removePokemon = makeRemovePokemon()
  return new RemovePokemonController(validation, removePokemon)
}
