const express = require("express");
const server = express();

const db = require("./database/db.js");

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server.get("/", function (req, res) {
    return res.render("index.html");
});

server.get("/create-point", function (req, res) {

    return res.render("create-point.html");
});

server.post("/savepoint", function (req, res) {

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
    `;

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no cadastro!");
        };
        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render("create-point.html", { saved: true });
    };

    db.run(query, values, afterInsertData);

});

server.get("/search", function (req, res) {

    const search = req.query.search;

    if (search == "") {
        return res.render("search-results.html", { count: 0 });
    };

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err);
        };
        const count = rows.length;

        return res.render("search-results.html", { places: rows, count: count });
    });
});

server.listen(3000);