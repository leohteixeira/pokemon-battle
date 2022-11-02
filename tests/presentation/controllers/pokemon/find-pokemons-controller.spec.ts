import { FindPokemonsController } from '@/presentation/controllers'
import { HttpError } from '@/presentation/errors'
import { FindPokemonsSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'

type SutTypes = {
  sut: FindPokemonsController
  findPokemonsSpy: FindPokemonsSpy
}

const makeSut = (): SutTypes => {
  const findPokemonsSpy = new FindPokemonsSpy()
  const sut = new FindPokemonsController(findPokemonsSpy)

  return {
    sut,
    findPokemonsSpy
  }
}

describe('FindPokemons Controller', () => {
  test('Should return ServerError if FindPokemons throws', async () => {
    const { sut, findPokemonsSpy } = makeSut()
    jest.spyOn(findPokemonsSpy, 'find').mockImplementationOnce(throwError)
    const result = await sut.handle()
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return ok if is succeeded', async () => {
    const { sut, findPokemonsSpy } = makeSut()
    const result = await sut.handle()
    expect(result.body).toEqual(findPokemonsSpy.result)
    expect(result.statusCode).toEqual(200)
  })
})
