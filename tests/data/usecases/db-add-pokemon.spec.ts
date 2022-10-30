import { DbAddPokemon } from '@/data/usecases'
import { AddPokemonRepositorySpy } from '@/tests/data/mocks'
import { mockAddPokemonParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/utils'

type SutTypes = {
  sut: DbAddPokemon
  addPokemonRepositorySpy: AddPokemonRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPokemonRepositorySpy = new AddPokemonRepositorySpy()
  const sut = new DbAddPokemon(addPokemonRepositorySpy)
  return {
    sut,
    addPokemonRepositorySpy
  }
}

describe('DbAddPokemon Usecase', () => {
  test('Should call AddPokemonRepository with correct values', async () => {
    const { sut, addPokemonRepositorySpy } = makeSut()
    const params = mockAddPokemonParams()
    await sut.add(params)
    expect(addPokemonRepositorySpy.params).toEqual(params)
  })

  test('Should throw if AddPokemonRepository throws', async () => {
    const { sut, addPokemonRepositorySpy } = makeSut()
    jest
      .spyOn(addPokemonRepositorySpy, 'add')
      .mockImplementationOnce(throwError)
    const promise = sut.add(mockAddPokemonParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an Pokemon.Model on success', async () => {
    const { sut, addPokemonRepositorySpy } = makeSut()
    const result = await sut.add(mockAddPokemonParams())
    expect(result).toEqual(addPokemonRepositorySpy.result)
  })
})
