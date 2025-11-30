var database = require("../database/config");

function registrar( pontuacao, tentativa , idusuario) {
    let instrucoesSql = `
            INSERT INTO pontuacao ( pontuacao, tentativas , id_usuario)
            VALUES ( ${pontuacao}, ${tentativa}, ${idusuario});
        `;

    console.log("Executando inserts da pontuação:");

    return database.executar(instrucoesSql);
}

function MedidasKpi(idusuario) {

    var instrucaoSql = `
        SELECT 
  pontuacao,
    ROUND((pontuacao / 5) * 100, 2) AS porcentagem_acertos,
    (SELECT COUNT(*) FROM resposta WHERE id_usuario = ${idusuario}) AS quantidade_tentativas
FROM pontuacao
WHERE id_usuario = ${idusuario}
group by tentativas, pontuacao 
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function  MedidasGrafico(idusuario) {

    var instrucaoSql = `
               SELECT 
  pontuacao as Respostas_certa,
   5 - pontuacao as Repostas_erradas,
     (SELECT COUNT(*) FROM resposta WHERE id_usuario = ${idusuario}) AS quantidade_tentativas
FROM pontuacao
WHERE id_usuario = ${idusuario}
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    MedidasGrafico,
    MedidasKpi,
    registrar
}
