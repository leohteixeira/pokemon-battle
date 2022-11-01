import { makeEditPokemon } from '@/main/factories/usecases'
import { makeEditPokemonValidation } from '@/main/factories/validations'
import { EditPokemonController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeEditPokemonController = (): Http.Controller => {
  const validation = makeEditPokemonValidation()
  const editPokemon = makeEditPokemon()
  return new EditPokemonController(validation, editPokemon)
}
