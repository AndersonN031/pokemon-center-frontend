"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPokemons, deletePokemon, Pokemon } from "@/services/pokemon";
import { isAuthenticated } from "@/hooks/useAuth";
import { PlusCircle } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
    if (deletingId) return;

    try {
      setDeletingId(id);
      await deletePokemon(id);
      await loadPokemons();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="hidden md:flex items-center relative mb-6">
        <h1 className="text-3xl font-bold">Pokedex</h1>

        <button
          onClick={() => router.push("/pokemons/new")}
          className="absolute right-0 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
        >
          <PlusCircle size={18} />
          Novo Pokemon
        </button>
      </div>

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
                disabled={deletingId === pokemon.id}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingId === pokemon.id ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
