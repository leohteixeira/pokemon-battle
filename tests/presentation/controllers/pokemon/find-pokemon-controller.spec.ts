import { FindPokemonController } from '@/presentation/controllers'
import { HttpError } from '@/presentation/errors'
import { FindPokemonSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { ValidationSpy } from '@/tests/validation/mocks'

import { datatype } from 'faker'

const mockRequest = (): FindPokemonController.Request => ({
  id: datatype.number({ min: 1 })
})

type SutTypes = {
  sut: FindPokemonController
  validationSpy: ValidationSpy
  findPokemonSpy: FindPokemonSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const findPokemonSpy = new FindPokemonSpy()
  const sut = new FindPokemonController(validationSpy, findPokemonSpy)

  return {
    sut,
    validationSpy,
    findPokemonSpy
  }
}

describe('FindPokemon Controller', () => {
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

  test('Should call FindPokemon with correct values', async () => {
    const { sut, findPokemonSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(findPokemonSpy.params).toEqual(request)
  })

  test('Should return ServerError if FindPokemon throws', async () => {
    const { sut, findPokemonSpy } = makeSut()
    jest.spyOn(findPokemonSpy, 'find').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return ok if request is succeeded', async () => {
    const { sut, findPokemonSpy } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.body).toEqual(findPokemonSpy.result)
    expect(result.statusCode).toEqual(200)
  })
})
