-- create database sonhoemjogo;
-- use sonhoemjogo;
-- drop database sonhoemjogo;
CREATE TABLE usuario (
  idusuario int PRIMARY KEY auto_increment,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha varCHAR(20) NOT NULL
);

select *from usuario;

CREATE TABLE pergunta (
  idpergunta INT PRIMARY KEY AUTO_INCREMENT ,
  enunciado VARCHAR(500)
);

CREATE TABLE opcao (
  idopcao INT PRIMARY KEY AUTO_INCREMENT,
  id_pergunta INT,
  opcao VARCHAR(300),
  correta INT, -- 1 = correta, 0 = errada
  FOREIGN KEY (id_pergunta) REFERENCES pergunta(idpergunta)
);

CREATE TABLE resposta (
  idresposta INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT,
  id_pergunta INT,
  id_opcao INT,
  acertou INT, -- 1 = correto, 0 = incorreto
  data_resposta DATETIME default current_timestamp ,
  FOREIGN KEY (id_usuario) REFERENCES usuario(idusuario),
  FOREIGN KEY (id_pergunta) REFERENCES pergunta(idpergunta),
  FOREIGN KEY (id_opcao) REFERENCES opcao(idopcao)
);

INSERT INTO usuario (nome, email, senha)VALUES 
('Bubu', 'bubu@email.com', '1234');

insert into pergunta (enunciado) value 
('Quantos jogadores entram em quadra?');

select* from pergunta;

insert into opcao (id_pergunta, opcao, correta) value 
(1,'5',0),
(1,'7',0),
(1,'6',1);

insert into resposta (id_usuario, id_pergunta, id_opcao, acertou) value
(1,1,1,0);


SELECT 
    u.nome,
    SUM(r.acertou) AS acertos,
    COUNT(*) - SUM(r.acertou) AS erros
FROM resposta r
JOIN usuario u ON u.idusuario = r.id_usuario
GROUP BY u.idusuario, u.nome;


   


/*
-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE aquatech;

USE aquatech;

CREATE TABLE empresa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	razao_social VARCHAR(50),
	cnpj CHAR(14),
	codigo_ativacao VARCHAR(50)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

create table medida (
	id INT PRIMARY KEY AUTO_INCREMENT,
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT,
	FOREIGN KEY (fk_aquario) REFERENCES aquario(id)
);

insert into empresa (razao_social, codigo_ativacao) values ('Empresa 1', 'ED145B');
insert into empresa (razao_social, codigo_ativacao) values ('Empresa 2', 'A1B2C3');
insert into aquario (descricao, fk_empresa) values ('Aquário de Estrela-do-mar', 1);
insert into aquario (descricao, fk_empresa) values ('Aquário de Peixe-dourado', 2);*/