"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updatePokemon } from "@/services/pokemon";
import { api } from "@/services/api";
import {
  ArrowLeft,
  Flame,
  Hash,
  Heart,
  Save,
  Sword,
  X,
  Zap,
} from "lucide-react";

export default function EditPokemon() {
  const router = useRouter();
  const params = useParams();

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    const res = await api.get(`/pokemon/${params.id}`);
    setForm(res.data);
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await updatePokemon(params.id as string, {
      name: form.name,
      type: form.type,
      level: Number(form.level),
      hp: Number(form.hp),
      pokedexNumber: Number(form.pokedexNumber),
    });
    router.push("/dashboard");
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
        <h1 className="text-2xl font-bold text-center">Editar Pokémon</h1>

        <div className="relative">
          <Sword
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            name="name"
            placeholder="Nome do Pokémon"
            value={form.name || ""}
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
            value={form.type || ""}
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
            type="number"
            min={0}
            placeholder="Level"
            value={form.level || ""}
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
            type="number"
            min={0}
            placeholder="HP"
            value={form.hp || ""}
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
            type="number"
            min={0}
            placeholder="Número da Pokédex"
            value={form.pokedexNumber || ""}
            className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-3 mt-4 w-full">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition text-white py-2 rounded-lg text-sm font-medium cursor-pointer"
          >
            <Save size={16} />
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}
