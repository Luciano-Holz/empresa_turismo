//arquivo model da tabela viagem
const Motorista = require("../models/indexMotorista");
const Carro = require("../models/indexCarro");
const server = require("../server");

const Viagem = server.sequelize.define('viagem',{
    id: {
        type: server.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    destino: {
        type: server.Sequelize.STRING
    },
    dataSaida: {
        type: server.Sequelize.DATE
    },
    dataRetorno: {
        type: server.Sequelize.DATE
    },
    cnhMotorista: {
        type: server.Sequelize.STRING,
        references: {
        model: Motorista,
        key: 'cnh'
        }
    },
    renavamCarro: {
        type: server.Sequelize.STRING,
        references: {
        model: Carro,
        key: 'renavam'
        }
    }
});

//Motorista.belongsToMany(Carro, {through: 'Viagem'});
//Carro.belongsToMany(Motorista, {through: 'Viagem'});

//Criar tabela
//Viagem.sync({force: true});

module.exports = Viagem;