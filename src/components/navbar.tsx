"use client";

import { logout } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Navbar(){

  const router = useRouter()

  return(

    <nav className="bg-red-500 text-white p-4 flex justify-between">

      <h1
      onClick={()=>router.push("/dashboard")}
      className="font-bold text-xl cursor-pointer"
      >
        Pokedex Admin
      </h1>

      <div className="space-x-4">

        <button
        onClick={()=>router.push("/pokemons/new")}
        className="bg-white text-red-500 px-3 py-1 rounded"
        >
          Novo Pokemon
        </button>

        <button
        onClick={logout}
        className="bg-black px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </nav>

  )
}