const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan'); // Importando o morgan

const app = express(); // Inicializando o app antes de usar o morgan
app.use(morgan('combined')); // Usa o formato de logging 'combined' que inclui informações detalhadas sobre cada requisição

app.use(bodyParser.json());
app.use(cors());

// Caminho para o arquivo dados.json
const dataFilePath = path.join(__dirname, 'dados.json');

// Função para ler dados do arquivo JSON
const readDataFromFile = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ usuarios: [], treinos: [], nextUserId: 1, nextTreinoId: 1 }));
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Função para escrever dados no arquivo JSON
const writeDataToFile = (data) => {
  console.log('Escrevendo dados no arquivo:', data);
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Rota para listar todos os usuários
app.get('/usuarios', (req, res) => {
  const data = readDataFromFile();
  res.json(data.usuarios);
});

// Rota para obter um usuário específico
app.get('/usuarios/:id', (req, res) => {
  const data = readDataFromFile();
  const user = data.usuarios.find(u => u.id === parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.json(user);
});

// Rota para criar um novo usuário
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  const data = readDataFromFile();
  const newUser = { id: data.nextUserId, nome, email };
  data.usuarios.push(newUser);

  // Atualiza o contador de próximo ID
  data.nextUserId += 1;
  writeDataToFile(data);

  res.status(201).json(newUser);
});

// Rota para listar todos os treinos
app.get('/treinos', (req, res) => {
  const data = readDataFromFile();
  res.json(data.treinos);
});

// Rota para listar os treinos de um usuário específico
app.get('/treinos/usuario/:id', (req, res) => {
  const data = readDataFromFile();
  const userTreinos = data.treinos.filter(treino => treino.usuarioId === parseInt(req.params.id, 10));
  res.json(userTreinos);
});

// Rota para criar um novo treino
app.post('/treinos', (req, res) => {
  console.log('Requisição recebida na rota /treinos');
  
  const data = readDataFromFile();
  const newTreino = req.body;

  console.log('Dados recebidos:', newTreino);

  // Verificar se todos os campos necessários estão presentes
  if (!newTreino.usuarioId || !newTreino.tipo || !newTreino.serie || !newTreino.repeticao) {
    return res.status(400).json({ error: 'Dados do treino estão incompletos' });
  }

  // Encontrar o usuário ao qual o treino será associado
  const user = data.usuarios.find(u => u.id === newTreino.usuarioId);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  // Adicionar treino ao array de treinos
  newTreino.id = data.nextTreinoId; // Definir ID do treino
  data.treinos.push(newTreino);

  // Atualiza o contador de próximo ID para treinos
  data.nextTreinoId += 1;
  writeDataToFile(data);

  console.log('Treino adicionado:', newTreino);

  res.status(201).json(newTreino);
});

app.delete('/usuarios/:id', (req, res) => {
  console.log(`Requisição DELETE recebida para ID: ${req.params.id}`);
  const data = readDataFromFile();
  const userId = parseInt(req.params.id, 10);

  // Verifica se o usuário existe
  const userIndex = data.usuarios.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    console.log('Usuário não encontrado');
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  // Remove o usuário do array
  data.usuarios.splice(userIndex, 1);
  console.log('Usuário removido:', data.usuarios);

  // Remove todos os treinos associados ao usuário
  data.treinos = data.treinos.filter(treino => treino.usuarioId !== userId);
  console.log('Treinos após remoção do usuário:', data.treinos);

  // Atualiza o arquivo JSON
  writeDataToFile(data);

  console.log('Usuário e treinos associados excluídos com sucesso');
  res.status(204).send(); // Retorna status 204 No Content para uma exclusão bem-sucedida
});

app.delete('/treinos/:id', (req, res) => {
  console.log(`Requisição DELETE recebida para ID: ${req.params.id}`);
  const data = readDataFromFile();
  const treinoId = parseInt(req.params.id, 10);

  // Verifica se o treino existe
  const treinoIndex = data.treinos.findIndex(t => t.id === treinoId);
  if (treinoIndex === -1) {
    console.log('Treino não encontrado');
    return res.status(404).json({ error: 'Treino não encontrado' });
  }

  // Remove o treino do array
  data.treinos.splice(treinoIndex, 1);
  writeDataToFile(data);

  console.log('Treino excluído com sucesso');
  res.status(204).send(); // Retorna status 204 No Content para uma exclusão bem-sucedida
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Iniciar o servidor
const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});
