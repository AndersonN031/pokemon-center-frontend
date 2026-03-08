"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";
import { Mail, User, Lock, Loader2, Check, X } from "lucide-react";
import { strongPasswordRegex } from "@/utils/password";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const passwordChecks = {
    length: password.length >= 6,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z\d]/.test(password),
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      password: "",
    };

    if (!name) newErrors.name = "O nome é obrigatório";
    if (!email) newErrors.email = "O email é obrigatório";
    if (!password) newErrors.password = "A senha é obrigatória";

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.password) {
      return;
    }

    if (!strongPasswordRegex.test(password)) {
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);

      await registerUser({ name, email, password });

      toast.success("Treinador foi registrado com sucesso!")
      router.push("/login");
    } catch {
      toast.error("Erro ao tentar registrar.")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-green-400 to-yellow-300">
      <form
        onSubmit={handleRegister}
        className="bg-white w-[360px] p-8 rounded-2xl shadow-xl flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">Registrar</h1>

        <div>
          <div className="relative">
            <User size={18} className="absolute left-3 top-4  text-gray-400" />

            <input
              placeholder="Nome"
              className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="relative">
          <Mail size={18} className="absolute left-3 top-4 text-gray-400" />

          <input
            placeholder="Email"
            className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <Lock size={18} className="absolute left-3 top-4 text-gray-400" />

          <input
            type="password"
            placeholder="Senha"
            className="pl-10 border border-[#ccc] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          {password && (
            <div className="text-sm mt-2 space-y-1">
              <p
                className={`flex items-center gap-2 ${passwordChecks.length ? "text-green-600" : "text-gray-400"}`}
              >
                {passwordChecks.length ? <Check size={14} /> : <X size={14} />}
                Pelo menos 6 caracteres
              </p>

              <p
                className={`flex items-center gap-2 ${passwordChecks.lowercase ? "text-green-600" : "text-gray-400"}`}
              >
                {passwordChecks.lowercase ? (
                  <Check size={14} />
                ) : (
                  <X size={14} />
                )}
                1 letra minúscula
              </p>

              <p
                className={`flex items-center gap-2 ${passwordChecks.uppercase ? "text-green-600" : "text-gray-400"}`}
              >
                {passwordChecks.uppercase ? (
                  <Check size={14} />
                ) : (
                  <X size={14} />
                )}
                1 letra maiúscula
              </p>

              <p
                className={`flex items-center gap-2 ${passwordChecks.number ? "text-green-600" : "text-gray-400"}`}
              >
                {passwordChecks.number ? <Check size={14} /> : <X size={14} />}1
                número
              </p>

              <p
                className={`flex items-center gap-2 ${passwordChecks.symbol ? "text-green-600" : "text-gray-400"}`}
              >
                {passwordChecks.symbol ? <Check size={14} /> : <X size={14} />}1
                símbolo
              </p>
            </div>
          )}
        </div>

        <button
          disabled={isLoading}
          className="bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading && <Loader2 size={18} className="animate-spin" />}
          {isLoading ? "Registrando..." : "Registrar"}
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
