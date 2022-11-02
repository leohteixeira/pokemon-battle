import { RemovePokemonController } from '@/presentation/controllers'
import {
  CompositeValidation,
  RequiredValidation
} from '@/validation/validations'
import { RequiredValidator } from '@/validation/validators'

export const makeRemovePokemonValidation =
  (): CompositeValidation<RemovePokemonController.Request> => {
    const requiredValidator = new RequiredValidator()

    return new CompositeValidation([
      new RequiredValidation(requiredValidator, ['id'])
    ])
  }
