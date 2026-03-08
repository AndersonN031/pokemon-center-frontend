"use client";

import { isAuthenticated, logout } from "@/hooks/useAuth";
import { Menu, X, LogOut, LayoutDashboard, EarthIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const auth = isAuthenticated();

    if (!auth) {
      router.push("/login");
    }

    setAuthenticated(auth);
    setLoading(false);
  }, [pathname]);

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  if (loading || !authenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 rounded-lg">
            ⚪
          </div>

          <span className="font-bold text-lg text-gray-800">Pokédex Admin</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-gray-600 font-medium"></div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => router.push("/pokemons/all-pokemons")}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition cursor-pointer"
          >
            <EarthIcon size={18} />
            Mundo
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition cursor-pointer"
          >
            <LayoutDashboard size={18} />
            Meus Pokemons
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg border border-black hover:bg-black hover:text-white transition cursor-pointer"
          >
            <LogOut size={18} />
            Sair
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
            onClick={() => router.push("/pokemons/all-pokemons")}
            className="w-48 flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-black transition cursor-pointer"
          >
            <EarthIcon size={18} />
            Mundo
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="w-48 flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition cursor-pointer"
          >
            <LayoutDashboard size={18} />
            Meus Pokemons
          </button>

          <button
            onClick={logout}
            className="w-48 flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg border border-black hover:bg-black hover:text-white transition cursor-pointer"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      )}
    </nav>
  );
}
