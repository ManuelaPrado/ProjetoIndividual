var medidaModel = require("../models/medidaModel");



function registrar(req, res) {
    var idusuario = req.body.idusuarioServer;
    var pontuacao=req.body.pontuacaoServer
    var tentativa=req.body.tentativaServer
    

 
    if (idusuario == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (pontuacao == undefined) {
        res.status(400).send("Seu pontuação está undefined!");
    } else if (tentativa == undefined) {
        res.status(400).send("Sua tentativa está undefined!");
    } else {
        medidaModel.registrar(pontuacao, tentativa, idusuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }}

function MedidasKpi(req, res) {

    const limite_linhas= 1;

    var idusuario = req.params.idusuario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.MedidasKpi(idusuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function MedidasGrafico(req, res) {

   var idusuario = req.params.idusuario;

    medidaModel.MedidasGrafico(idusuario).then(function (resultado) {
           if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
     registrar,
     MedidasKpi,
    MedidasGrafico
   

}