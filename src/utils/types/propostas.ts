import { GadoI } from "./gados";

export interface PropostaI {
  id: number;
  clienteId: string;
  gadoId: number;
  gado: GadoI;
  descricao: string;
  resposta: string | null;
  createdAt: string;
  updatedAt: string | null;
}
