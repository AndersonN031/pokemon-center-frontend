"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPokemons, deletePokemon, Pokemon } from "@/services/pokemon";
import { isAuthenticated } from "@/hooks/useAuth";

export default function Dashboard() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }

    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    const data = await getPokemons();
    setPokemons(data);
  };

  const handleDelete = async (id: string) => {
    await deletePokemon(id);
    loadPokemons();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pokedex</h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold">{pokemon.name}</h2>

            <div className="text-sm text-gray-600">
              <p>Tipo: {pokemon.type}</p>
              <p>Nível: {pokemon.level}</p>
              <p>HP: {pokemon.hp}</p>
              <p># {pokemon.pokedexNumber}</p>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => router.push(`/pokemons/edit/${pokemon.id}`)}
                className="flex-1 bg-yellow-400 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-yellow-300"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(pokemon.id!)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-red-400"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
