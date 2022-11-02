import { FindPokemonController } from '@/presentation/controllers'
import {
  CompositeValidation,
  RequiredValidation
} from '@/validation/validations'
import { RequiredValidator } from '@/validation/validators'

export const makeFindPokemonValidation =
  (): CompositeValidation<FindPokemonController.Request> => {
    const requiredValidator = new RequiredValidator()

    return new CompositeValidation([
      new RequiredValidation(requiredValidator, ['id'])
    ])
  }
