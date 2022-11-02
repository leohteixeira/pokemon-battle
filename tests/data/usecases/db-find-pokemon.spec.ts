import { DbFindPokemon } from '@/data/usecases'
import { FindPokemon } from '@/domain/usecases'
import { FindPokemonRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/utils'

import { datatype } from 'faker'

const mockFindPokemonParams = (): FindPokemon.Params => ({
  id: datatype.number({ min: 1 })
})

type SutTypes = {
  sut: DbFindPokemon
  findPokemonRepositorySpy: FindPokemonRepositorySpy
}

const makeSut = (): SutTypes => {
  const findPokemonRepositorySpy = new FindPokemonRepositorySpy()
  const sut = new DbFindPokemon(findPokemonRepositorySpy)
  return {
    sut,
    findPokemonRepositorySpy
  }
}

describe('DbFindPokemon Usecase', () => {
  test('Should call FindPokemonRepository with correct values', async () => {
    const { sut, findPokemonRepositorySpy } = makeSut()
    const params = mockFindPokemonParams()
    await sut.find(params)
    expect(findPokemonRepositorySpy.params).toEqual(params)
  })

  test('Should throw if FindPokemonRepository throws', async () => {
    const { sut, findPokemonRepositorySpy } = makeSut()
    jest
      .spyOn(findPokemonRepositorySpy, 'findPokemon')
      .mockImplementationOnce(throwError)
    const promise = sut.find(mockFindPokemonParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return Pokemon.Model on success', async () => {
    const { sut, findPokemonRepositorySpy } = makeSut()
    const result = await sut.find(mockFindPokemonParams())
    expect(result).toEqual(findPokemonRepositorySpy.result)
  })
})
