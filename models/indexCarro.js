//arquivo model da tabela carro 
const server = require("../server");

const Carro = server.sequelize.define('carro',{
    id: {
        type: server.Sequelize.INTEGER,
        unique: true,
        autoIncrement: true
    },
  renavam: {
    type: server.Sequelize.STRING,
    primaryKey: true
  },
  modelo: {
    type: server.Sequelize.STRING
  },
  passageiros: {
    type: server.Sequelize.INTEGER
  },
  fabricacao: {
    type: server.Sequelize.DATE
  },
  placa: {
    type: server.Sequelize.STRING
  }
});

//criando tabela
//Carro.sync({force: true});

module.exports = Carro;