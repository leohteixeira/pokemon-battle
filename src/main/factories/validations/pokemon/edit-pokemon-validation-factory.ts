import { EditPokemonController } from '@/presentation/controllers'
import {
  CompositeValidation,
  ObjectKeyValidation,
  RequiredValidation
} from '@/validation/validations'
import { RequiredValidator, TypeValidator } from '@/validation/validators'

export const makeEditPokemonValidation =
  (): CompositeValidation<EditPokemonController.Request> => {
    const requiredValidator = new RequiredValidator()
    const stringValidator = new TypeValidator('string')

    return new CompositeValidation([
      new RequiredValidation(requiredValidator, ['id', 'treinador']),
      new ObjectKeyValidation(stringValidator, 'treinador')
    ])
  }
