"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPokemon } from "@/services/pokemon";

export default function NewPokemon(){

  const router = useRouter()

  const [form,setForm] = useState({
    name:"",
    type:"",
    level:0,
    hp:0,
    pokedexNumber:0
  })

  const handleChange = (e:any)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e:any)=>{
    e.preventDefault()

    await createPokemon({
      ...form,
      level:Number(form.level),
      hp:Number(form.hp),
      pokedexNumber:Number(form.pokedexNumber)
    })

    router.push("/dashboard")
  }

  return(

    <div className="flex justify-center mt-10">

      <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 w-96 space-y-3"
      >

        <h1 className="text-2xl font-bold">
          Criar Pokémon
        </h1>

        <input
        name="name"
        placeholder="Nome"
        className="border w-full p-2"
        onChange={handleChange}
        />

        <input
        name="type"
        placeholder="Tipo"
        className="border w-full p-2"
        onChange={handleChange}
        />

        <input
        name="level"
        placeholder="Level"
        type="number"
        className="border w-full p-2"
        onChange={handleChange}
        />

        <input
        name="hp"
        placeholder="HP"
        type="number"
        className="border w-full p-2"
        onChange={handleChange}
        />

        <input
        name="pokedexNumber"
        placeholder="Pokedex Number"
        type="number"
        className="border w-full p-2"
        onChange={handleChange}
        />

        <button className="bg-green-500 text-white w-full p-2 rounded">
          Criar
        </button>

      </form>

    </div>

  )
}