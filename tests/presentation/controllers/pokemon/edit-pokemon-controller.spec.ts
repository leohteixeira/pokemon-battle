import { HttpError } from '@/presentation/errors'
import { EditPokemonController } from '@/presentation/controllers'
import { EditPokemonSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { mockEditPokemonParams } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

const mockRequest = (): EditPokemonController.Request => mockEditPokemonParams()

type SutTypes = {
  sut: EditPokemonController
  validationSpy: ValidationSpy
  editPokemonSpy: EditPokemonSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const editPokemonSpy = new EditPokemonSpy()
  const sut = new EditPokemonController(validationSpy, editPokemonSpy)

  return {
    sut,
    validationSpy,
    editPokemonSpy
  }
}

describe('EditPokemon Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return BadRequest if validation return invalid params', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockResolvedValueOnce({
      param: 'error'
    })
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.BadRequest)
  })

  test('Should return ServerError if validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should call EditPokemon with correct values', async () => {
    const { sut, editPokemonSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(editPokemonSpy.params).toEqual({
      id: request.id,
      treinador: request.treinador
    })
  })

  test('Should return ServerError if EditPokemon throws', async () => {
    const { sut, editPokemonSpy } = makeSut()
    jest.spyOn(editPokemonSpy, 'edit').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return noContent if request is succeeded', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.statusCode).toEqual(204)
  })
})
