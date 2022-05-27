import React, { useState, useEffect } from 'react'

import Card from '../../components/Card'
import { allPokemon, detailPokemon } from '../../services/PokemonApi'
import LogoPokemon from '../../assets/img/pokemon-logo.png'

function Home() {
  const [offset, setOffset] = useState(0)
  const [pokemonList, setPokemonList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getAllPokemon = async () => {
    setIsLoading(true)
    const response = await allPokemon(offset)
    const data = response.data.results
    if (response.status === 200) {
      getDetailPokemon(data)
    }
  }

  const getDetailPokemon = async (results: any) => {
    const _pokemonsList = await Promise.all(
      results.map(async (result: any) => {
        const response = await await detailPokemon(result.name)
        return response.data
      })
    )

    setPokemonList((currentList) => [...currentList, ..._pokemonsList])
    setIsLoading(false)
  }

  const scrollToEnd = () => {
    setOffset(offset + 20)
  }

  window.onscroll = () => {
    const offsetHeight = document.documentElement.offsetHeight
    const newHeight = isLoading ? offsetHeight + 76 : offsetHeight
    if (
      window.innerHeight + Math.ceil(document.documentElement.scrollTop) ===
      newHeight
    ) {
      scrollToEnd()
    }
  }

  useEffect(() => {
    getAllPokemon()
  }, [offset])

  return (
    <div>
      <div className="flex justify-center my-10">
        <img src={LogoPokemon} alt="logo-pokemon" width={300} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 lg:px-20 mb-10">
        {pokemonList.map((item, index) => {
          return <Card key={index} pokemon={item} />
        })}
      </div>

      {isLoading && (
        <div className="flex justify-center text-3xl font-bold my-10">
          Loading . . .
        </div>
      )}
    </div>
  )
}

export default Home
