import { Treino } from "./treino";

export interface perfilUsuarioFinal {
  cpf: string;
  peso: number;
  altura: number;
  objetivo: string;
  dias: string[]; // Aqui você especifica que 'dias' é um array de strings
  treinos: Treino[];
}

