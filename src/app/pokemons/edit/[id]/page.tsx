"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updatePokemon } from "@/services/pokemon";
import { api } from "@/services/api";

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
        pokedexNumber: Number(form.pokedexNumber)
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 w-96 space-y-3"
      >
        <h1 className="text-2xl font-bold">Editar Pokémon</h1>

        <input
          name="name"
          value={form.name || ""}
          className="border w-full p-2"
          onChange={handleChange}
        />

        <input
          name="type"
          value={form.type || ""}
          className="border w-full p-2"
          onChange={handleChange}
        />

        <input
          name="level"
          value={form.level || ""}
          className="border w-full p-2"
          onChange={handleChange}
        />

        <input
          name="hp"
          value={form.hp || ""}
          className="border w-full p-2"
          onChange={handleChange}
        />

        <input
          name="pokedexNumber"
          value={form.pokedexNumber || ""}
          className="border w-full p-2"
          onChange={handleChange}
        />

        <button className="bg-green-500 text-white w-full p-2">
          Atualizar
        </button>
      </form>
    </div>
  );
}
