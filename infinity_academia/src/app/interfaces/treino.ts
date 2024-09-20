
import { Exercicio } from './exercicio';

export interface Treino {
  objetivo: string;
  exercicios: Exercicio[];
  dias: string[];
  timestamp: Date;
}
