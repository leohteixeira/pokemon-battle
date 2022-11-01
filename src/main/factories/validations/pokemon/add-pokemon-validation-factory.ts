import { AddPokemonController } from '@/presentation/controllers'
import {
  CompositeValidation,
  ObjectKeyValidation,
  RequiredValidation
} from '@/validation/validations'
import {
  PokemonTypeValidator,
  RequiredValidator,
  TypeValidator
} from '@/validation/validators'

export const makeAddPokemonValidation =
  (): CompositeValidation<AddPokemonController.Request> => {
    const requiredValidator = new RequiredValidator()
    const stringValidator = new TypeValidator('string')
    const pokemonTypeValidator = new PokemonTypeValidator()

    return new CompositeValidation([
      new RequiredValidation(requiredValidator, ['treinador', 'tipo']),
      new ObjectKeyValidation(stringValidator, 'treinador'),
      new ObjectKeyValidation(pokemonTypeValidator, 'tipo')
    ])
  }
