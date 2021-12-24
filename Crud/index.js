const api = require("./api");
const express = require('express');
const { default: axios } = require("axios");

const server = express();

server.use(express.json());

const cursos = [];

// Retorna um Curso
server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;
        return res.json(cursos[index]);
});

//Retornar todos os cursos
server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

server.get('/teste', (req, res) => {
    return res.json(teste);
});

//Criar um novo curso
server.post('/cursos', async (req, res) => {
    const { nome, endereco, renda } = req.body;

    try {
        const cep = await api.get(`https://viacep.com.br/ws/${endereco || '08225220'}/json/`);
        cursos.push({ nome, cep, renda });

        return res.json(cursos);
    } catch (error) {
        res.send({ error: error.message })
    }
});

function cep() {
    return axios.get("https://viacep.com.br/ws/")
}

endereco = cep();

endereco.then(function  (resposta){
    console.log(resposta.data);
}).catch(function(error){
    console.log(error);
});


//Atualizar um curso
server.put('/cursos/:index', (req, res) => {
    const {index} = req.params;
    const {name} = req.body;

    cursos[index] = name;

    return res.json(cursos)
});

//Deletar um curso
server.delete('/cursos/:index', (req, res) => {
    const {index} = req.params;

    cursos.splice(index, 1);

    return res.json ({message: "O curso foi deletado"});
});

server.get("/viaCep", async (req, res) => {
    try {
        const {endereco} = await api.get ("viaCep/1");
        return res.send({name: endereco.name})
    } catch  (error) {
       res.send({error: error.message})
    }
 })

server.listen(3000);