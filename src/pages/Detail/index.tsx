import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { detailPokemon } from '../../services/PokemonApi'
import { getImageURL } from '../../configs/Utils'

function Detail() {
  const [pokemon, setPokemon] = useState<any>({})
  const [types, setTypes] = useState<any>([])
  const [stats, setStats] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [img, setImg] = useState<string>('')
  const [classType, setClassType] = useState<string>('')

  const { name } = useParams()
  const navigate = useNavigate()

  const getDetailPokemon = async () => {
    setIsLoading(true)
    const response = await detailPokemon(name || '')

    if (response.status === 200) {
      const data = response.data
      setPokemon(data)
      setImg(getImageURL(data.id))
      setTypes(data.types)
      setStats(data.stats)
      const className = data.types
        .map((type: any) => 'type-' + type.type.name)
        .join(' ')
      setClassType(className)
    }
    setIsLoading(false)
  }

  const goBack = () => {
    navigate('/pokemon')
  }

  useEffect(() => {
    getDetailPokemon()
  }, [])

  const Loader = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-3xl font-semibold">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full flex justify-center items-center h-screen">
            <div className="md:w-1/2 px-3 md:px-0">
              <button
                className="flex items-center space-x-2 mb-3"
                onClick={goBack}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="font-bold">Back</span>
              </button>
              <div className={`card h-min ${classType}`}>
                <div className="flex flex-col items-center mb-3 text-white uppercase">
                  <h1 className="text-3xl font-bold mb-2">{pokemon.name}</h1>
                  <img src={img} alt={pokemon.name} width={150} />
                  <div className="flex mt-2">
                    {types.map((item: any) => {
                      return (
                        <span
                          className="rounded-xl bg-white/30 px-3 py-1 m-1 text-xs font-semibold"
                          key={item.type.name}
                        >
                          {item.type.name}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <div className="bg-white rounded-3xl">
                  <div className="flex flex-wrap justify-center p-3">
                    {stats.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="w-full flex justify-between py-2 uppercase border-b border-gray-200 last:border-b-0"
                        >
                          <h3>{item.stat.name}</h3>
                          <span className="font-bold">{item.base_stat}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail
