//arquivo model da tabela pessoa
const Sequelize  = require('sequelize');
const server = require('../server');

const Pessoa = server.sequelize.define('pessoa', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
    }
});

//criando a tabela
// Pessoa.sync({force: true});

module.exports = Pessoa;