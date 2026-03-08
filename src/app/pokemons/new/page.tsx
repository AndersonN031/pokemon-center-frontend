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
  X,
  Zap,
} from "lucide-react";

export default function NewPokemon() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "",
    level: 0,
    hp: 0,
    pokedexNumber: 0,
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isLoading) return; // impede múltiplos submits

    try {
      setIsLoading(true);

      await createPokemon({
        ...form,
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
    <div className="flex flex-col items-center mt-10">
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer mb-4"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Voltar</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Criar Pokémon</h1>

        <div className="relative">
          <Sword
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="name"
            required
            placeholder="Nome"
            className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <Flame
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="type"
            placeholder="Tipo"
            required
            className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <Zap
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="level"
            min={0}
            type="number"
            required
            placeholder="Level"
            className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <Heart
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="hp"
            min={0}
            type="number"
            required
            placeholder="HP"
            className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <Hash
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="pokedexNumber"
            min={0}
            type="number"
            required
            placeholder="Número da Pokédex"
            className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-3 mt-4 w-full">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition text-white py-2 rounded-lg text-sm font-medium cursor-pointer rounded disabled:opacity-50"
          >
            <PlusCircle size={18} />
            {isLoading ? "Criando..." : "Criar pokémon"}
          </button>
        </div>
      </form>
    </div>
  );
}
