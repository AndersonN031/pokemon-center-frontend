"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUser({ email, password });

      router.push("/dashboard");
    } catch (error) {
      alert("Erro ao fazer login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500">
  <form
    onSubmit={handleLogin}
    className="bg-white w-[360px] p-8 rounded-2xl shadow-xl flex flex-col gap-4"
  >
    <h1 className="text-3xl font-bold text-center">Entrar</h1>

  
    <div className="relative">
      <Mail
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        placeholder="Email"
        className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-400"
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
        className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-400"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button className="bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer">
      Entrar
    </button>

    <p className="text-center text-sm">
      Treinador novo?
      <span
        onClick={() => router.push("/register")}
        className="text-blue-500 cursor-pointer ml-1"
      >
        Registrar
      </span>
    </p>
  </form>
</div>
  );
}
