"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPokemon } from "@/services/pokemon";
import {
  ArrowLeft,
  Flame,
  Hash,
  Heart,
  PlusCircle,
  Sword,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";

export default function NewPokemon() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    level: 0,
    hp: 0,
    pokedexNumber: 0,
  });

  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");

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

      await createPokemon({
        ...form,
        type,
        level: Number(form.level),
        hp: Number(form.hp),
        pokedexNumber: Number(form.pokedexNumber),
      });

      toast.success("Pokémon criado com sucesso!")
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
          Criar Pokémon
        </h1>

        {/* Nome */}
        <div className="relative">
          <Sword
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="name"
            required
            pattern="[A-Za-zÀ-ÿ\s]+"
            title="Apenas letras são permitidas"
            placeholder="Nome"
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
            required
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
            min={1}
            max={100}
            type="number"
            required
            placeholder="Level"
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
            min={1}
            max={999}
            type="number"
            required
            placeholder="HP"
            className="pl-10 border border-gray-200 p-3 rounded-lg w-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            onChange={handleChange}
          />
        </div>

        {/* Pokedex */}
        <div className="relative">
          <Hash
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="pokedexNumber"
            min={1}
            
            max={9999}
            type="number"
            required
            placeholder="Número da Pokédex"
            className="pl-10 border border-gray-200 p-3 rounded-lg w-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-lg text-sm font-semibold shadow-md cursor-pointer disabled:opacity-50"
        >
          <PlusCircle size={18} />
          {isLoading ? "Criando..." : "Criar Pokémon"}
        </button>
      </form>
    </div>
  );
}