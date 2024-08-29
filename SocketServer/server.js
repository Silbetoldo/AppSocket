const express = require('express');  // Importa o framework Express para construir o servidor
const http = require('http');  // Importa o módulo HTTP para criar o servidor
const socketIo = require('socket.io');  // Importa a biblioteca Socket.io para comunicação em tempo real
const cors = require('cors');  // Importa o middleware CORS para permitir requisições de diferentes origens

// Cria uma instância do aplicativo Express
const app = express();

// Cria um servidor HTTP utilizando a instância do Express
const server = http.createServer(app);

// Configura o Socket.io para usar o servidor HTTP e define as opções de CORS
const io = socketIo(server, {
  cors: {
    origin: "*",  // Permite conexões de qualquer origem
    methods: ["GET", "POST"]  // Permite apenas os métodos GET e POST
  }
});

// Usa o middleware CORS para permitir requisições de diferentes origens
app.use(cors());

// Define o evento 'connection' para o Socket.io, que é acionado quando um cliente se conecta
io.on('connection', (socket) => {
  console.log('A user connected');  // Exibe uma mensagem no console quando um usuário se conecta

  // Define o evento 'disconnect' para o Socket.io, que é acionado quando um cliente se desconecta
  socket.on('disconnect', () => {
    console.log('User disconnected');  // Exibe uma mensagem no console quando um usuário se desconecta
  });

  // Define o evento 'message' para o Socket.io, que é acionado quando uma mensagem é recebida
  socket.on('message', (data) => {
    console.log('Message received: ', data);  // Exibe a mensagem recebida no console
    io.emit('message', data);  // Transmite a mensagem para todos os clientes conectados
  });
});

// Define a porta do servidor, que é obtida de uma variável de ambiente ou é 3000 por padrão
const PORT = process.env.PORT || 3000;

// Faz o servidor escutar a porta definida e exibe uma mensagem no console quando o servidor está em execução
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);  // Exibe a porta na qual o servidor está ouvindo
});
