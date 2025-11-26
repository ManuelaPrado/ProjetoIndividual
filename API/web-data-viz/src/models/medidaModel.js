var database = require("../database/config");

function registrar( respostas, quiz, idusuario) {
    let instrucoesSql = `
            INSERT INTO pontuacao ( acertou, quiz, id_usuario)
            VALUES ( ${respostas}, ${quiz}), ${idusuario};
        `;

    console.log("Executando inserts da pontuação:");

    return database.executar(instrucoesSql);
}

function respostaPergunta(idusuario) {

    var instrucaoSql = `
        SELECT 
            u.nome,
            SUM(p.acertou) AS acertos,
            COUNT(*) - SUM(p.acertou) AS erros,
            COUNT(*) AS total
        FROM pontuacao p
        JOIN usuario u ON u.idusuario = p.id_usuario
        WHERE p.id_usuario = ${idusuario}
        GROUP BY u.idusuario, u.nome;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function respostaEmTempoReal(idusuario) {

    var instrucaoSql = `
        SELECT 
            p.data_resposta AS tempo
        FROM pontuacao p 
        JOIN usuario u ON u.idusuario = p.id_usuario
        WHERE p.id_usuario = ${idusuario}
        ORDER BY p.data_resposta;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    respostaPergunta,
    respostaEmTempoReal,
    registrar
}
