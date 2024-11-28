import { create } from "zustand";
import { ClienteI } from "@/utils/types/clientes";

type clienteStore = {
  cliente: ClienteI;
  logaCliente: (clienteLogado: ClienteI) => void;
  deslogaCliente: () => void;
};

export const useClienteStore = create<clienteStore>((set) => ({
  cliente: {} as ClienteI,
  logaCliente: (clienteLogado) => set({ cliente: clienteLogado }),
  deslogaCliente: () => set({ cliente: {} as ClienteI }),
}));