const express = require("express")
const server = express()

//5º pegar o bd - para ter acesso ao banco
const db = require("./database/db.js")

//3ºconfigurar pasta publica
server.use(express.static("public"))

//6º habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))

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

    //pega as query strings da url
    console.log(req.query)

    return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {

    //req.body: o corpo do nosso formulario
    console.log(req.body)

    //inserir dados no banco de dados   
    const query = `
        INSERT INTO places (
            image,
            name, 
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInsertData(err) {
        if (err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.send("ok!")
    }

    //afterInsertData aqui entra como uma função callback, só é executada depois ...
    db.run(query, values, afterInsertData)

    
})



server.get("/search", function (req, res) {

        //Consultar dados na tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err){
            return console.log(err)
        }

        //contador de places - usado no html
        const count = rows.length

        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, count: count });
    })
    
});

//1º ligar o servidor
server.listen(3000)
  