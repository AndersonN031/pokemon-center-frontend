"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";
import { Mail, User, Lock } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      await registerUser({ name, email, password });

      alert("Treinador registrado!");

      router.push("/login");
    } catch {
      alert("Erro ao registrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-green-400 to-yellow-300">
  <form
    onSubmit={handleRegister}
    className="bg-white w-[360px] p-8 rounded-2xl shadow-xl flex flex-col gap-4"
  >
    <h1 className="text-3xl font-bold text-center">Registrar</h1>

   
    <div className="relative">
      <User
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        placeholder="Nome"
        className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    
    <div className="relative">
      <Mail
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        placeholder="Email"
        className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    
    <div className="relative">
      <Lock
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="password"
        placeholder="Senha"
        className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button className="bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer">
      Registrar
    </button>

    <p className="text-center text-sm">
      Já tem uma conta?
      <span
        onClick={() => router.push("/login")}
        className="text-blue-500 cursor-pointer ml-1"
      >
        Entrar
      </span>
    </p>
  </form>
</div>
  );
}
