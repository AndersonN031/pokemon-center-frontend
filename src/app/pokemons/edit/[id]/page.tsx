"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updatePokemon } from "@/services/pokemon";
import { api } from "@/services/api";
import { ArrowLeft, Flame, Hash, Heart, Save, Sword, Zap } from "lucide-react";

export default function EditPokemon() {
  const router = useRouter();
  const params = useParams();

  const [form, setForm] = useState<any>({});
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pokemonTypes = [
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
  ];

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    const res = await api.get(`/pokemon/${params.id}`);
    setForm(res.data);

    if (res.data.type) {
      const types = res.data.type.split("/");
      setType1(types[0] || "");
      setType2(types[1] || "");
    }
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      setIsLoading(true);

      const type = type2 ? `${type1}/${type2}` : type1;

      await updatePokemon(params.id as string, {
        name: form.name,
        type,
        level: Number(form.level),
        hp: Number(form.hp),
        pokedexNumber: Number(form.pokedexNumber),
      });

      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-blue-50 p-6">
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer mb-6"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Voltar</span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-96 space-y-5 border border-gray-100"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Editar Pokémon
        </h1>

        {/* Nome */}
        <div className="relative">
          <Sword
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="name"
            placeholder="Nome do Pokémon"
            pattern="[A-Za-zÀ-ÿ\s]+"
            title="Apenas letras são permitidas"
            value={form.name || ""}
            className="pl-10 border border-gray-200 p-3 rounded-lg w-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={handleChange}
          />
        </div>

        {/* Tipo 1 */}
        <div className="relative">
          <Flame
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            value={type1}
            onChange={(e) => {
              setType1(e.target.value);
              setType2("");
            }}
            className="pl-10 border border-gray-200 p-3 rounded-lg w-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          >
            <option value="">Selecione o tipo</option>

            {pokemonTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo 2 */}
        {type1 && (
          <select
            value={type2}
            onChange={(e) => setType2(e.target.value)}
            className="border border-gray-200 p-3 rounded-lg w-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          >
            <option value="">Segundo tipo (opcional)</option>

            {pokemonTypes
              .filter((t) => t !== type1)
              .map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
          </select>
        )}

        {/* Level */}
        <div className="relative">
          <Zap
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="level"
            type="number"
            min={1}
            max={100}
            placeholder="Level"
            value={form.level || ""}
            className="pl-10 border border-gray-200 p-3 rounded-lg w-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            onChange={handleChange}
          />
        </div>

        {/* HP */}
        <div className="relative">
          <Heart
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="hp"
            type="number"
            min={1}
            max={999}
            placeholder="HP"
            value={form.hp || ""}
            className="pl-10 border border-gray-200 p-3 rounded-lg w-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            onChange={handleChange}
          />
        </div>

        {/* Pokédex */}
        <div className="relative">
          <Hash
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="pokedexNumber"
            type="number"
            min={1}
            max={9999}
            placeholder="Número da Pokédex"
            value={form.pokedexNumber || ""}
            className="pl-10 border border-gray-200 p-3 rounded-lg w-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-lg text-sm font-semibold shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={16} />
          {isLoading ? "Atualizando..." : "Atualizar"}
        </button>
      </form>
    </div>
  );
}
