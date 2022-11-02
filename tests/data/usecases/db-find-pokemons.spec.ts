import { DbFindPokemons } from '@/data/usecases'
import { FindPokemonsRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/utils'

type SutTypes = {
  sut: DbFindPokemons
  findPokemonsRepositorySpy: FindPokemonsRepositorySpy
}

const makeSut = (): SutTypes => {
  const findPokemonsRepositorySpy = new FindPokemonsRepositorySpy()
  const sut = new DbFindPokemons(findPokemonsRepositorySpy)
  return {
    sut,
    findPokemonsRepositorySpy
  }
}

describe('DbFindPokemons Usecase', () => {
  test('Should throw if FindPokemonsRepository throws', async () => {
    const { sut, findPokemonsRepositorySpy } = makeSut()
    jest
      .spyOn(findPokemonsRepositorySpy, 'findPokemons')
      .mockImplementationOnce(throwError)
    const promise = sut.find()
    await expect(promise).rejects.toThrow()
  })

  test('Should return DatabaseDocument.List on success', async () => {
    const { sut, findPokemonsRepositorySpy } = makeSut()
    const result = await sut.find()
    expect(result).toEqual(findPokemonsRepositorySpy.result)
  })
})
