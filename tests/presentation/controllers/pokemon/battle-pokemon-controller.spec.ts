import { BattlePokemonController } from '@/presentation/controllers'
import { HttpError } from '@/presentation/errors'
import { BattlePokemonSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { ValidationSpy } from '@/tests/validation/mocks'

import { datatype } from 'faker'

const mockRequest = (): BattlePokemonController.Request => ({
  pokemonAId: datatype.number({ min: 1 }),
  pokemonBId: datatype.number({ min: 1 })
})

type SutTypes = {
  sut: BattlePokemonController
  validationSpy: ValidationSpy
  battlePokemonSpy: BattlePokemonSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const battlePokemonSpy = new BattlePokemonSpy()
  const sut = new BattlePokemonController(validationSpy, battlePokemonSpy)

  return {
    sut,
    validationSpy,
    battlePokemonSpy
  }
}

describe('BattlePokemon Controller', () => {
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

  test('Should call BattlePokemon with correct values', async () => {
    const { sut, battlePokemonSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(battlePokemonSpy.params).toEqual(request)
  })

  test('Should return ServerError if BattlePokemon throws', async () => {
    const { sut, battlePokemonSpy } = makeSut()
    jest.spyOn(battlePokemonSpy, 'battle').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return ok if request is succeeded', async () => {
    const { sut, battlePokemonSpy } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.body).toEqual(battlePokemonSpy.result)
    expect(result.statusCode).toEqual(200)
  })
})
