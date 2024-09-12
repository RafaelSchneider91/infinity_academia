export class Treino {
  id: number;
  tipo: string;
  serie!: number;
  repeticao!: number;
  status: number;
  modificacao: Date;
  diasSemana: string[]; // Adicione a propriedade diasSemana

  constructor(id: number, tipo: string) {
    this.id = id;
    this.tipo = tipo;
    this.modificacao = new Date();
    this.status = 0; // Status padrão para ativo
    this.diasSemana = []; // Inicialize diasSemana como um array vazio
  }
}

export class Usuario {
  id: number;
  nome: string;
  email: string;
  treinos: Treino[];

  constructor(id: number, nome: string, email: string, treinos: Treino[] = []) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.treinos = treinos;
  }
}
export class Academia {
  usuario: Usuario[] = [];
  treino: Treino[] = [];
  ultId = 0;
  ultIdu = 0;

  constructor() {}

  inserirTreino(tipo: string, serie: number, repeticao: number, status: number, diasSemana: string[]): Treino {
    this.ultId++;
    const treino = new Treino(this.ultId, tipo);
    treino.serie = serie;
    treino.repeticao = repeticao;
    treino.status = status;
    treino.diasSemana = diasSemana; // Defina diasSemana aqui
    this.treino.push(treino);
    return treino;
  }

  removerTreino(id: number): Treino | undefined {
    const index = this.treino.findIndex(n => n.id === id);
    if (index !== -1) {
      return this.treino.splice(index, 1)[0];
    }
    return undefined;
  }

  inserirUsuario(nome: string, email: string): Usuario {
    this.ultIdu++;
    const usuario = new Usuario(this.ultIdu, nome, email);
    this.usuario.push(usuario);
    return usuario;
  }

  removerUsuario(id: number): Usuario | undefined {
    const index = this.usuario.findIndex(u => u.id === id);
    if (index !== -1) {
      return this.usuario.splice(index, 1)[0];
    }
    return undefined;
  }
}



