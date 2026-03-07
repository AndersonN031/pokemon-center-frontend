"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";

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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-2xl mb-4 font-bold">Login</h1>
        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full p-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}
