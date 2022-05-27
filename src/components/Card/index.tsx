import React from 'react'
import { useNavigate } from 'react-router-dom'

import { getImageURL } from '../../configs/Utils'

function Card({ pokemon }: any) {
  const navigate = useNavigate()
  const { name, id, types } = pokemon
  const imageUrl = getImageURL(id)
  const className = types.map((type: any) => 'type-' + type.type.name).join(' ')

  const goDetail = () => {
    navigate(`/pokemon/${name}`)
  }

  return (
    <div
      className={`card cursor-pointer hover:-mt-3 ${className}`}
      onClick={goDetail}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 order-1 md:order-first">
          <div className="flex flex-col justify-between h-full text-white uppercase">
            <h3 className="text-xl font-bold mb-4 break-all">{name}</h3>
            <div className="flex flex-wrap">
              {types.map((item: any) => {
                return (
                  <span
                    className="rounded-xl bg-white/30 px-3 py-1 m-1 text-xs"
                    key={item.type.name}
                  >
                    {item.type.name}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <img src={imageUrl} alt={id} className="w-full h-44" />
        </div>
      </div>
    </div>
  )
}

export default Card
