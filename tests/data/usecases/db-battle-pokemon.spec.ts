import { DbBattlePokemon } from '@/data/usecases'
import { BattlePokemon } from '@/domain/usecases'
import { BattlePokemonRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/utils'

import { datatype } from 'faker'

const mockBattlePokemonParams = (): BattlePokemon.Params => ({
  pokemonAId: datatype.number({ min: 1 }),
  pokemonBId: datatype.number({ min: 1 })
})

type SutTypes = {
  sut: DbBattlePokemon
  battlePokemonRepositorySpy: BattlePokemonRepositorySpy
}

const makeSut = (): SutTypes => {
  const battlePokemonRepositorySpy = new BattlePokemonRepositorySpy()
  const sut = new DbBattlePokemon(battlePokemonRepositorySpy)
  return {
    sut,
    battlePokemonRepositorySpy
  }
}

describe('DbBattlePokemon Usecase', () => {
  test('Should call BattlePokemonRepository with correct values', async () => {
    const { sut, battlePokemonRepositorySpy } = makeSut()
    const params = mockBattlePokemonParams()
    await sut.battle(params)
    expect(battlePokemonRepositorySpy.params).toEqual(params)
  })

  test('Should throw if BattlePokemonRepository throws', async () => {
    const { sut, battlePokemonRepositorySpy } = makeSut()
    jest
      .spyOn(battlePokemonRepositorySpy, 'battlePokemon')
      .mockImplementationOnce(throwError)
    const promise = sut.battle(mockBattlePokemonParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return Pokemon.Model on success', async () => {
    const { sut, battlePokemonRepositorySpy } = makeSut()
    const result = await sut.battle(mockBattlePokemonParams())
    expect(result).toEqual(battlePokemonRepositorySpy.result)
  })
})
