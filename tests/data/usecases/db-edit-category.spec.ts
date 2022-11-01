import { DbEditPokemon } from '@/data/usecases'
import { EditPokemonRepositorySpy } from '@/tests/data/mocks'
import { mockEditPokemonParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/utils'

type SutTypes = {
  sut: DbEditPokemon
  editPokemonRepositorySpy: EditPokemonRepositorySpy
}

const makeSut = (): SutTypes => {
  const editPokemonRepositorySpy = new EditPokemonRepositorySpy()
  const sut = new DbEditPokemon(editPokemonRepositorySpy)
  return {
    sut,
    editPokemonRepositorySpy
  }
}

describe('DbEditPokemon Usecase', () => {
  test('Should call EditPokemonRepository with correct values', async () => {
    const { sut, editPokemonRepositorySpy } = makeSut()
    const params = mockEditPokemonParams()
    await sut.edit(params)
    expect(editPokemonRepositorySpy.params).toEqual(params)
  })

  test('Should throw if EditPokemonRepository throws', async () => {
    const { sut, editPokemonRepositorySpy } = makeSut()
    jest
      .spyOn(editPokemonRepositorySpy, 'editPokemon')
      .mockImplementationOnce(throwError)
    const promise = sut.edit(mockEditPokemonParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a void on success', async () => {
    const { sut } = makeSut()
    const result = await sut.edit(mockEditPokemonParams())
    expect(result).toBeUndefined()
  })
})
