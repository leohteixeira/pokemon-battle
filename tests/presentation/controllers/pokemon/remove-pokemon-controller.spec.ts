import { HttpError } from '@/presentation/errors'
import { RemovePokemonController } from '@/presentation/controllers'
import { RemovePokemonSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { ValidationSpy } from '@/tests/validation/mocks'

import { datatype } from 'faker'

const mockRequest = (): RemovePokemonController.Request => ({
  id: datatype.number({ min: 1 })
})

type SutTypes = {
  sut: RemovePokemonController
  validationSpy: ValidationSpy
  removePokemonSpy: RemovePokemonSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const removePokemonSpy = new RemovePokemonSpy()
  const sut = new RemovePokemonController(validationSpy, removePokemonSpy)

  return {
    sut,
    validationSpy,
    removePokemonSpy
  }
}

describe('RemovePokemon Controller', () => {
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

  test('Should call RemovePokemon with correct values', async () => {
    const { sut, removePokemonSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(removePokemonSpy.params).toEqual({
      id: request.id
    })
  })

  test('Should return ServerError if RemovePokemon throws', async () => {
    const { sut, removePokemonSpy } = makeSut()
    jest.spyOn(removePokemonSpy, 'remove').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return noContent if request is succeeded', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.statusCode).toEqual(204)
  })
})
