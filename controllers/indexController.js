//Arquivo para controlar as rotas e a função delas
//importando o modulo express
const express = require('express');
const app = express();
//importando os arquivos models das tabelas
const Motorista = require('../models/indexMotorista');
const Carro = require('../models/indexCarro');
const Viagem = require('../models/indexViagem');
//processador de templates handlebars
const handlebars = require('express-handlebars');
const moment = require('moment');
//informando ao app para carregar o arquivo main
app.engine('handlebars', handlebars({
    defaultLayout:'main',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      formatDate: (date) => {
        return moment(date).format('DD-MM-YYYY')
      }}
  }))
app.set('view engine', 'handlebars')
    
app.use(express.urlencoded({extended: false}));
app.use(express.json());

    ////////Rotas para a tabela motorista//////
  //rota para mostrar todos os motoristas
    app.get('/motorista', (req, res) => {
        Motorista.findAll().then((motoristas) => {
            res.render('motorista', {motoristas: motoristas});
        })
    });
    //rota para mostrar a pagina motorista
    app.get('/motorista', (req, res) => {
        res.render('motorista')
    });
    //rota para cadastrar motorista
    app.post('/motorista', (req, res) => {
        Motorista.create({
            id: req.body.id,
            cnh: req.body.cnh,
            nome: req.body.nome,
            nascimento: req.body.nascimento,
            sexo: req.body.sexo,
            telefone: req.body.telefone,
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            uf: req.body.uf
        }).then(() => {res.redirect('/motorista')
      }).catch((erro) => {
        res.send("Cadastro de motorista não realizado."+ erro)
      })
    });
    //rota para receber motorista pelo id
    app.get('/edit-motorista/:id', (req, res) => {
        Motorista.findOne({where: {'id': req.params.id}}).then((motorista) => {
          res.render('edit-motorista', {motorista: motorista.toJSON()})
        }).catch((erro) => {
          res.redirect("/motorista")
        })
      });
      //rota para editar motorista
    app.post('/motorista-edit', (req, res) => {
        Motorista.findOne({where: {id: req.body.id}}).then((motorista) =>{
            motorista.id = req.body.id
            motorista.cnh = req.body.cnh
            motorista.nome = req.body.nome
            motorista.nascimento = req.body.nascimento
            motorista.sexo = req.body.sexo
            motorista.telefone = req.body.telefone
            motorista.rua = req.body.rua
            motorista.numero = req.body.numero
            motorista.bairro = req.body.bairro
            motorista.cidade = req.body.cidade
            motorista.uf = req.body.uf
            motorista.save().then(() => {
            res.redirect('/motorista')
          })
        }).catch((erro) =>{
          res.send('Houve um erro' + erro)
          res.redirect('/pagamento')
        })
    });
    //rota para deletar motorista
    app.get("/del-motorista/:id", (req, res) => {
          Motorista.destroy({
            where: {'id': req.params.id}
          }).then(() => {
            res.redirect("/motorista")
          }).catch((erro) => {
            res.send('Motorista não apagado!' + erro);
          })
    });
    //////////Rotas para a tabela carro/////////
    //rota para mostrar todos os carros
    app.get('/carro', (req, res) => {
      Carro.findAll().then((carros) => {
        res.render('carro', {carros: carros});
      })  
    });
    //rota para mostrar a pagina carro
    app.get('/carro', (req, res) => {
        res.render('carro')
    });
    //rota para cadastrar carro
    app.post('/carro', (req, res) => {
        Carro.create({
            id: req.body.id,
            renavam: req.body.renavam,
            modelo: req.body.modelo,
            passageiros: req.body.passageiros,
            fabricacao: req.body.fabricacao,
            placa: req.body.placa
        }).then(() =>{res.redirect("/carro")
        }).catch((erro) =>{
          res.send("Erro: Cadastro de carro nao realizado!" + erro)
        })
    });
    //rota receber carro pelo id
    app.get('/edit-carro/:id', (req, res) => {
        Carro.findOne({where: {'id': req.params.id}}).then((carro) => {
          res.render('edit-carro', {carro: carro.toJSON()})
        }).catch((erro) => {
          res.redirect("/carro" + erro)
        })
    });
      //rota para editar carro
    app.post('/carro-edit', (req, res) => {
        Carro.findOne({where: {id: req.body.id}}).then((carro) =>{
            carro.id = req.body.id
            carro.modelo = req.body.modelo
            carro.passageiros = req.body.passageiros
            carro.fabricacao = req.body.fabricacao
            carro.placa = req.body.placa
            carro.save().then(() => {
                res.redirect('/carro')
            })
        }).catch((erro) =>{
          res.send('erro', 'Houve um erro')
          res.redirect('/carro')
        })
    });
    //rota deletar carro
    app.get("/del-carro/:id", (req, res) =>{
        Carro.destroy({
          where: {'id': req.params.id}
        }).then(() => {
          res.redirect("/carro")
        }).catch((erro) => {
          res.send('Carro não apagado!')
        })
    });
    // // ////////Rotas para a tabela viagem
    //rota para mostrar todas as viagens
    app.get('/viagem', (req, res) => {
        Viagem.findAll().then((viagem) => {
            res.render('viagem', {viagem: viagem});
        })  
    });
    //rota para mostrar a página viagem
    app.get('/viagem', (req, res) => {
        res.render('viagem')
    });
    //rota para cadastrar viagem
    app.post('/viagem', (req, res) => {
        Viagem.create({
            destino: req.body.destino,
            dataSaida: req.body.dataSaida,
            dataRetorno: req.body.dataRetorno,
            cnhMotorista: req.body.cnhMotorista,
            renavamCarro: req.body.renavamCarro
        }).then(() => { res.redirect("/viagem")
        }).catch((erro) => {
          res.send("Erro: Cadastro de viagem nao realizado!" + erro)
        })
    });
      //rota receber viagem pelo id
    app.get('/edit-viagem/:id', (req, res) => {
        Viagem.findOne({where: {id:req.params.id}}).then((viagem) => {
            res.render('edit-viagem', {viagem: viagem.toJSON()})
          }).catch((erro) => {
            res.redirect("/viagem" + erro)
        })
    });
    //rota para atualizar viagem
    app.post('/viagem-edit', (req, res) => {
        Viagem.findOne({where: {id: req.body.id}}).then((viagem) =>{
            viagem.destino = req.body.destino
            viagem.dataSaida = req.body.dataSaida
            viagem.dataRetorno = req.body.dataRetorno
            viagem.cnhMotorista = req.body.cnhMotorista
            viagem.renavamCarro = req.body.renavamCarro
            viagem.save().then(() => {
                res.redirect('/viagem')
            })
        }).catch((erro) =>{
          res.send('erro', 'Houve um erro')
          res.redirect('/viagem')
        })
      });
      //rota para deletar viagem
    app.get("/del-viagem/:id", (req, res) => {
        Viagem.destroy({
          where: {'id': req.params.id}
        }).then(() => {
          res.redirect("/viagem")
        }).catch((erro) => {
          res.send('Viagem não apagada!')
        })
    });
//servidor escutando na porta 8080
app.listen(8080, () => console.log("Conectado na porta 8080!"))
