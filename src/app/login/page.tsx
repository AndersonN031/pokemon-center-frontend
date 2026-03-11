"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";
import { Mail, Lock, Loader2, EyeOff, Eye } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    credentials: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
      credentials: "",
    };

    if (!email) newErrors.email = "O email é obrigatório";
    if (!password) newErrors.password = "A senha é obrigatória";

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) return;

    if (isLoading) return;

    try {
      setIsLoading(true);

      await loginUser({ email, password });

      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setErrors({
        email: "",
        password: "",
        credentials: "Email ou senha inválidos.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 p-6">
      <div className="flex flex-col items-center gap-6">
        {/* Mensagem de boas-vindas */}
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">
            Bem-vindo ao Pokémon Center
          </h1>
          <p className="text-white/90">
            Entre para gerenciar sua Pokédex e cuidar dos seus Pokémon.
          </p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleLogin}
          className="bg-white w-[360px] p-8 rounded-2xl shadow-xl flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold text-center">Entrar</h2>

          <div>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-4 text-gray-400" />

              <input
                placeholder="Email"
                className={`pl-10 border p-3 rounded-lg w-full focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-[#ccc] focus:ring-red-400"
                }`}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className={`pl-10 pr-10 border p-3 rounded-lg w-full focus:outline-none focus:ring-2 ${
                  errors.password || errors.credentials
                    ? "border-red-400 focus:ring-red-400"
                    : "border-[#ccc] focus:ring-red-400"
                }`}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Olhinho */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {(errors.password || errors.credentials) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password || errors.credentials}
              </p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

          <button
            disabled={isLoading}
            className="bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-sm">
            Treinador novo?
            <Link
              href="/register"
              className="text-blue-500 ml-1 hover:underline"
            >
              Registrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
