import { BattlePokemonController } from '@/presentation/controllers'
import {
  CompositeValidation,
  RequiredValidation
} from '@/validation/validations'
import { RequiredValidator } from '@/validation/validators'

export const makeBattlePokemonValidation =
  (): CompositeValidation<BattlePokemonController.Request> => {
    const requiredValidator = new RequiredValidator()

    return new CompositeValidation([
      new RequiredValidation(requiredValidator, ['pokemonAId', 'pokemonBId'])
    ])
  }
