"use client";

import { useState } from "react";
import { registerUser } from "@/services/auth";

export default function RegisterPage() {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleRegister = async (e:React.FormEvent) => {
    e.preventDefault()

    try{
      await registerUser({name,email,password})

      alert("Usuário criado!")
    }catch{
      alert("Erro ao registrar")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <form onSubmit={handleRegister} className="bg-white p-6 shadow w-80">

        <h1 className="text-2xl mb-4 font-bold">Registro</h1>

        <input
        className="border w-full p-2 mb-3"
        placeholder="Nome"
        onChange={(e)=>setName(e.target.value)}
        />

        <input
        className="border w-full p-2 mb-3"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        className="border w-full p-2 mb-3"
        placeholder="Senha"
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-green-500 text-white w-full p-2">
          Criar conta
        </button>

      </form>

    </div>
  );
}