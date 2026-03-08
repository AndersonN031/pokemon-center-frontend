"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPokemons, deletePokemon, Pokemon } from "@/services/pokemon";
import { isAuthenticated } from "@/hooks/useAuth";
import { PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const typeColors: Record<string, string> = {
    Normal: "bg-gray-200 text-gray-800",
    Fire: "bg-red-500 text-white",
    Water: "bg-blue-500 text-white",
    Electric: "bg-yellow-400 text-black",
    Grass: "bg-green-500 text-white",
    Ice: "bg-cyan-400 text-white",
    Fighting: "bg-orange-700 text-white",
    Poison: "bg-purple-500 text-white",
    Ground: "bg-yellow-600 text-white",
    Flying: "bg-indigo-400 text-white",
    Psychic: "bg-pink-500 text-white",
    Bug: "bg-lime-500 text-black",
    Rock: "bg-stone-500 text-white",
    Ghost: "bg-indigo-700 text-white",
    Dragon: "bg-purple-700 text-white",
    Dark: "bg-gray-800 text-white",
    Steel: "bg-slate-400 text-black",
    Fairy: "bg-pink-300 text-black",
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        router.push("/login");
        return;
      }

      await loadPokemons();
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const loadPokemons = async () => {
    const data = await getPokemons();
    setPokemons(data);
  };

  const handleDelete = async (id: string) => {
    if (deletingId) return;

    try {
      setDeletingId(id);
      await deletePokemon(id);
      toast.success("Pokémon removido com sucesso!");
      await loadPokemons();
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">📘 Pokedex</h1>

        <button
          onClick={() => router.push("/pokemons/new")}
          className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow cursor-pointer w-full md:w-auto"
        >
          <PlusCircle size={18} />
          Novo Pokemon
        </button>
      </div>

      {/* Aviso se não houver pokemons */}
      {pokemons.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow">
          <p className="text-gray-600 mb-4">
            Você ainda não adicionou nenhum Pokémon.
          </p>

          <button
            onClick={() => router.push("/pokemons/new")}
            className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow cursor-pointer"
          >
            <PlusCircle size={18} />
            Adicionar primeiro Pokémon
          </button>
        </div>
      )}

      {/* Grid de pokemons */}
      {pokemons.length > 0 && (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition"
            >
              {/* Header do card */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {pokemon.name}
                </h2>

                <span className="text-xs font-semibold text-gray-500">
                  #{pokemon.pokedexNumber}
                </span>
              </div>

              {/* Tipo */}
              <div className="flex gap-2 flex-wrap">
                {pokemon.type.split("/").map((type: string) => (
                  <span
                    key={type}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      typeColors[type] || "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {type}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="text-sm text-gray-600 flex justify-between">
                <p>
                  <span className="font-semibold text-gray-800">
                    Lvl:
                  </span>{" "}
                  {pokemon.level}
                </p>

                <p>
                  <span className="font-semibold text-gray-800">HP:</span>{" "}
                  {pokemon.hp}
                </p>
              </div>

              {/* Botões */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => router.push(`/pokemons/edit/${pokemon.id}`)}
                  className="flex-1 bg-yellow-400 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-yellow-300 transition"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(pokemon.id!)}
                  disabled={deletingId === pokemon.id}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-red-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === pokemon.id ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
