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

-- inserindo registros
-- categorias 
insert into categorias (nome) values ('Eletrônicos') , ('Eletrodomésticos') , ('Informática');

-- produtos

insert into produtos (nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria)
values ('Mouse USB','Mouse USB', 20, true, 60.0, current_date,1), 
('Mouse Sem FIO','Mouse sem fio', 10, true, 120.0, current_date,1),
('Teclado USB','Teclado USB', 30, true, 500.0, current_date,1);

-- avaliações
insert into avaliacoes (autor, email, texto, nota, data, produto) 
values  ('Jorge', 'jorgebavaresco@ifsul.edu.br','Mouse muito preciso', 5, current_date, 1);


-- consultas

select p.codigo as codigo, p.nome as nome, p.descricao as descricao, p.quantidade_estoque as quantidade_estoque, p.ativo as ativo, p.valor as valor, to_char(p.data_cadastro,'YYYY-MM-DD') as data_cadastro, p.categoria as categoria, c.nome as categoria_nome
from produtos p
join categorias c on p.categoria = c.codigo
order by p.codigo;

select * from avaliacoes;

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
