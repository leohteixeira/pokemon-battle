import { DbRemovePokemon } from '@/data/usecases'
import { RemovePokemon } from '@/domain/usecases'
import { RemovePokemonRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/utils'

import { datatype } from 'faker'

const mockRemovePokemonParams = (): RemovePokemon.Params => ({
  id: datatype.number({ min: 1 })
})

type SutTypes = {
  sut: DbRemovePokemon
  removePokemonRepositorySpy: RemovePokemonRepositorySpy
}

const makeSut = (): SutTypes => {
  const removePokemonRepositorySpy = new RemovePokemonRepositorySpy()
  const sut = new DbRemovePokemon(removePokemonRepositorySpy)
  return {
    sut,
    removePokemonRepositorySpy
  }
}

describe('DbRemovePokemon Usecase', () => {
  test('Should call RemovePokemonRepository with correct values', async () => {
    const { sut, removePokemonRepositorySpy } = makeSut()
    const params = mockRemovePokemonParams()
    await sut.remove(params)
    expect(removePokemonRepositorySpy.params).toEqual(params)
  })

  test('Should throw if RemovePokemonRepository throws', async () => {
    const { sut, removePokemonRepositorySpy } = makeSut()
    jest
      .spyOn(removePokemonRepositorySpy, 'removePokemon')
      .mockImplementationOnce(throwError)
    const promise = sut.remove(mockRemovePokemonParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a void on success', async () => {
    const { sut } = makeSut()
    const result = await sut.remove(mockRemovePokemonParams())
    expect(result).toBeUndefined()
  })
})
