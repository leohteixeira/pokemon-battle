import { Pokemon } from '@/domain/models'
import { HttpError } from '@/presentation/errors'
import { AddPokemonController } from '@/presentation/controllers'
import { AddPokemonSpy } from '@/tests/presentation/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
import { throwError } from '@/tests/utils'

import { random } from 'faker'

const mockRequest = (): AddPokemonController.Request => ({
  tipo: random.arrayElement([
    Pokemon.PokemonType.CHARIZARD,
    Pokemon.PokemonType.MEWTWO,
    Pokemon.PokemonType.PIKACHU
  ]),
  treinador: random.words()
})

type SutTypes = {
  sut: AddPokemonController
  validationSpy: ValidationSpy
  addPokemonSpy: AddPokemonSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addPokemonSpy = new AddPokemonSpy()
  const sut = new AddPokemonController(validationSpy, addPokemonSpy)

  return {
    sut,
    validationSpy,
    addPokemonSpy
  }
}

describe('AddPokemon Controller', () => {
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

  test('Should call AddPokemon with correct values', async () => {
    const { sut, addPokemonSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addPokemonSpy.params).toEqual({
      tipo: request.tipo,
      treinador: request.treinador
    })
  })

  test('Should return ServerError if AddPokemon throws', async () => {
    const { sut, addPokemonSpy } = makeSut()
    jest.spyOn(addPokemonSpy, 'add').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return ok if request is succeeded', async () => {
    const { sut, addPokemonSpy } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(addPokemonSpy.result)
  })
})
