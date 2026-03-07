import { api } from "./api";

export interface Pokemon {
  id?: string;
  name: string;
  type: string;
  level: number;
  hp: number;
  pokedexNumber: number;
}

export const getPokemons = async () => {
  const response = await api.get("/pokemon");
  return response.data;
};

export const createPokemon = async (data: Pokemon) => {
  const response = await api.post("/pokemon", data);
  return response.data;
};

export const updatePokemon = async (id: string, data: Pokemon) => {
  const response = await api.patch(`/pokemon/${id}`, data);
  return response.data;
};

export const deletePokemon = async (id: string) => {
  const response = await api.delete(`/pokemon/${id}`);
  return response.data;
};