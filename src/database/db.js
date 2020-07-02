//1º npm install sqlite3
//2º cria pasta db.js

//3º importar a dependencia do sqlite
const sqlite3 = require("sqlite3")
    .verbose();

//criar um objeto que ira fazer operações no bd - cria o arquivo Database.db
const db = new sqlite3.Database("./src/database/database.db");

//exportar o obj
module.exports = db;

// //utiliza o obj de bd para fazer nossas operações  - metodo serialize: rodar uma sequencia de codigo
// db.serialize( () => {

//     //com os comandos do sql: 1 criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //2 Inserir dados na tabela   
//     const query = `
//         INSERT INTO places (
//             image,
//             name, 
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, lampadas"
//     ]

//     function afterInsertData(err) {
//         if (err){
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     //afterInsertData aqui entra como uma função callback, só é executada depois ...
//     db.run(query, values, afterInsertData)

//     // Consultar dados na tabela
//     // db.all(`SELECT * FROM places`, function(err, rows) {
//     //     if (err){
//     //         return console.log(err)
//     //     }
//     //     console.log("Aqui estão seus dados")
//     //     console.log(rows)
//     // })

//     //deletar os dados na tabela
//     // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err, rows) {
//     //     if (err){
//     //         return console.log(err)
//     //     }
//     //     console.log("Registro deletado com sucesso")
//     // })

// })