"use client";

import { useEffect, useState } from "react";
import { getListGlobalPokemons } from "@/services/pokemon";
import toast from "react-hot-toast";

interface Pokemon {
  id: string;
  name: string;
  type: string;
  level: number;
  hp: number;
  pokedexNumber: number;
  user?: {
    name: string;
  };
}

export default function GlobalPokemonsPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const loadPokemons = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const response = await getListGlobalPokemons(pageNumber);

      setPokemons(response.data);
      setPage(response.page);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error("Erro ao carregar pokemons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons(1);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">
        🌍 Pokédex Global
      </h1>

      <div className="bg-gradient-to-br from-red-50 via-white to-blue-50 rounded-2xl shadow-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-red-100 border-b text-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">#</th>
                <th className="p-4 text-left font-semibold">Pokémon</th>
                <th className="p-4 text-left font-semibold">Tipo</th>
                <th className="p-4 text-left font-semibold">Level</th>
                <th className="p-4 text-left font-semibold">HP</th>
                <th className="p-4 text-left font-semibold">Treinador</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8">
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-6 h-6 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                      <span>Carregando Pokémons...</span>
                    </div>
                  </td>
                </tr>
              ) : pokemons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8">
                    Nenhum Pokémon encontrado
                  </td>
                </tr>
              ) : (
                pokemons.map((pokemon, index) => (
                  <tr
                    key={pokemon.id}
                    className={`border-t transition hover:bg-yellow-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-blue-50"
                    }`}
                  >
                    <td className="p-4 font-bold text-gray-700">
                      #{pokemon.pokedexNumber}
                    </td>

                    <td className="p-4 font-semibold text-gray-900">
                      {pokemon.name}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        {pokemon.type.split("/").map((type) => (
                          <span
                            key={type}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              typeColors[type] || "bg-gray-200 text-gray-800"
                            }`}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 text-blue-600 font-medium">
                      {pokemon.level}
                    </td>

                    <td className="p-4 text-red-600 font-medium">
                      {pokemon.hp}
                    </td>

                    <td className="p-4 max-w-[220px]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-xs font-bold text-white shadow">
                          {pokemon.user?.name?.charAt(0)}
                        </div>

                        <span className="text-gray-700 truncate max-w-[160px] block">
                          {pokemon.user?.name || "Sem dono"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINAÇÃO */}

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => loadPokemons(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-40 cursor-pointer"
        >
          Anterior
        </button>

        <span className="font-medium text-gray-700">
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => loadPokemons(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 cursor-pointer"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
