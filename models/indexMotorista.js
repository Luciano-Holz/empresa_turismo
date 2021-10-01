//arquivo model da tabela motorista
const Sequelize  = require('sequelize');
const server = require('../server');

const Motorista = server.sequelize.define('motorista', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true
    },
    cnh: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
    },
    nascimento: {
        type: Sequelize.DATE,
    },
    sexo: {
        type: Sequelize.ENUM('M', 'F')
    },
    telefone: {
        type: Sequelize.STRING
    },
    rua: {
        type: Sequelize.STRING
    },
    numero: {
        type: Sequelize.INTEGER
    },
    bairro: {
        type: Sequelize.STRING
    },
    cidade: {
        type: Sequelize.STRING
    },
    uf: {
        type: Sequelize.STRING
    }
});

//criando a tabela
//Motorista.sync({force: true});

module.exports = Motorista;