const express = require("express")
const server = express()

//5º pegar o bd - para ter acesso ao banco
const db = require("./database/db.js")

//3ºconfigurar pasta publica
server.use(express.static("public"))

//4ºutilizando template engine - mundanças no html tipo ngfor*
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//Configurar rotas
//2º pag inicial
server.get("/", function (req, res) {
    return res.render("index.html");
});

server.get("/create-point", function (req, res) {
    return res.render("create-point.html");
});

server.get("/search", function (req, res) {

        //Consultar dados na tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err){
            return console.log(err)
        }


        const count = rows.length

        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, count: count });
    })
    
});

//1º ligar o servidor
server.listen(3000)
  