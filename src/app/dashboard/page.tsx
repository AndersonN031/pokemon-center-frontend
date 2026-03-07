"use client";

import { useEffect, useState } from "react";
import { getPokemons, deletePokemon, Pokemon } from "@/services/pokemon";

export default function Dashboard() {

  const [pokemons,setPokemons] = useState<Pokemon[]>([])

  const loadPokemons = async () => {
    const data = await getPokemons()
    setPokemons(data)
  }

  const handleDelete = async (id:string) => {
    await deletePokemon(id)
    loadPokemons()
  }

  useEffect(()=>{
    loadPokemons()
  },[])

  return (

    <div className="p-10">

      <h1 className="text-3xl mb-6 font-bold">
        Pokédex Administrativa
      </h1>

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-200">
            <th>Nome</th>
            <th>Tipo</th>
            <th>Nível</th>
            <th>HP</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

        {pokemons.map((pokemon)=>(
          <tr key={pokemon.id} className="border">

            <td>{pokemon.name}</td>
            <td>{pokemon.type}</td>
            <td>{pokemon.level}</td>
            <td>{pokemon.hp}</td>

            <td>

              <button
              onClick={()=>handleDelete(pokemon.id!)}
              className="bg-red-500 text-white px-3 py-1"
              >
                Delete
              </button>

            </td>

          </tr>
        ))}

        </tbody>

      </table>

    </div>

  )

}