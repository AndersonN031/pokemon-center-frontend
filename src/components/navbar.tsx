"use client";

import { logout } from "@/hooks/useAuth";
import {
  Menu,
  X,
  Search,
  LogOut,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ userName = "Treinador" }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 rounded-lg">
            ⚪
          </div>

          <span className="font-bold text-lg text-gray-800">
            Pokédex Admin
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1 hover:text-black cursor-pointer"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          
        </div>



        <div className="hidden md:flex items-center gap-3">

          
          <button
            onClick={() => router.push("/pokemons/new")}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
          >
            <PlusCircle size={18} />
            Novo Pokemon
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition cursor-pointer"
          >
            <LogOut size={18} />
          </button>
        </div>

        
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

     
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3">

          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-700 cursor-pointer"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>


          <button
            onClick={() => router.push("/pokemons/new")}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            <PlusCircle size={18} />
            Novo Pokémon
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-black-500 cursor-pointer"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      )}
    </nav>
  );
}