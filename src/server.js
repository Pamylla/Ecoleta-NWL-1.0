const express = require("express")
const server = express()

//3ºconfigurar pasta publica
server.use(express.static("public"))

//Configurar rotas
//2º pag inicial
server.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

server.get("/create-point", function (req, res) {
    res.sendFile(__dirname + "/views/create-point.html");
});

//1º ligar o servidor
server.listen(3000)