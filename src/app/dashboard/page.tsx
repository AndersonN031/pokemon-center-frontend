"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPokemons, deletePokemon, Pokemon } from "@/services/pokemon";
import { isAuthenticated } from "@/hooks/useAuth";

export default function Dashboard() {

  const router = useRouter();
  const [pokemons,setPokemons] = useState<Pokemon[]>([])

  useEffect(()=>{

    if(!isAuthenticated()){
      router.push("/login")
    }

    loadPokemons()

  },[])

  const loadPokemons = async () => {
    const data = await getPokemons()
    setPokemons(data)
  }

  const handleDelete = async (id:string) => {
    await deletePokemon(id)
    loadPokemons()
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Pokédex Administrativa
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Nível</th>
            <th>HP</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

        {pokemons.map((pokemon)=>(
          <tr key={pokemon.id} className="border text-center">

            <td>{pokemon.name}</td>
            <td>{pokemon.type}</td>
            <td>{pokemon.level}</td>
            <td>{pokemon.hp}</td>

            <td className="space-x-2">

              <button
              onClick={()=>router.push(`/pokemons/edit/${pokemon.id}`)}
              className="bg-yellow-400 px-3 py-1 rounded"
              >
                Editar
              </button>

              <button
              onClick={()=>handleDelete(pokemon.id!)}
              className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Deletar
              </button>

            </td>

          </tr>
        ))}

        </tbody>

      </table>

      <button
      onClick={()=>router.push("/pokemons/new")}
      className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
      >
        Adicionar Pokémon
      </button>

    </div>
  )
}