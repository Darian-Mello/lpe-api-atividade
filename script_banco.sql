create table atividade (
   codigo serial not null primary key, 
   nome varchar not null
);

create table acao (
   codigo serial not null primary key, 
   nome varchar(200) not null,
   descricao text not null,
   atividade_id integer not null,
   foreign key (atividade_id) references atividade (codigo)
);

-- criação da tabela usuários
create table usuario (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

-- inserindo alguns registros na tabela usuários
insert into usuario (email, senha, tipo, telefone, nome) 
values ('darianvargas.pf017@academico.ifsul.edu.br', '123456', 'A','(55)99642-0439','Darian Mello'), 
('teste@ifsul.edu.br', '123456', 'U','(54)44484-4348','Joao');
