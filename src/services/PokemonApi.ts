import { api } from '../configs/BaseService'

export const allPokemon = async (data: string | number) => {
  return await api().get(`pokemon?limit=20&offset=${data}`)
}

export const detailPokemon = async (data: string) => {
  return await api().get(`pokemon/${data}`)
}