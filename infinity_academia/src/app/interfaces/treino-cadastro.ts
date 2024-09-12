// src/_components/treinoCadastro/treino-cadastro.ts
export interface TreinoCadastro {
  usuarioId: number;
  tipo: string;
  serie: number; // Mantido como número
  repeticao: number; // Mantido como número
  status: string;
  modificacaoTs: string;
  diasSemana: string[]; // Adicionado para incluir os dias da semana
}
