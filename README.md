

# Passos para instalação e execução

### Instalação e preparação do ambiente
<ol>
<li> Em uma pasta abra seu git bash e use <code>git clone url_do_repositório </code>
<li>Abra um terminal no vs code e certifique-se de que ele está em <code>sua_pasta\Implementacao_de_camadas
</code> (caso esteja em uma pasta anterior use <code>cd Implementacao_de_camadas</code>)
<li>No terminal use <code>npm install</code> para instalar as dependências 
<li>É preciso ter Postegres instalado
<li>No postgres crie um banco de dados <code>Compromissos</code> e uma tabela usando o seguinte código. 
<li>

<code>CREATE TABLE compromissos(
	id SERIAL PRIMARY KEY, 
	inicio TIMESTAMP NOT NULL,
	fim TIMESTAMP NOT NULL,
	descricao TEXT NOT NULL,
	UNIQUE (inicio, fim));
</code>
<li> Vá para a pasta <code>BD</code> arquivo <code>postgres_compromissos.ts</code>
<li> Altere a secção <code>password</code> para sua senha usada no usuário que criou o banco dados. Caso esteja usando outro user (que não o postgres) troque-o também . 
<li> No temrinal teste os comandos disponíveis.
</ol>

### Execução (no terminal)
<ol>
<li> Para adicionar um compromisso: <code>npx ts-node main.ts add 'descrição' 'data' 'hora_inicio' 'hora_fim'</code> (data no formato -> dd/mm/yyyy e inicio e fim ->  hh:mm)
<li> Para listar os  compromissos: <code>npx ts-node main.ts list</code>
<li>Para obter mais exemplos: <code>npx ts-node main.ts help</code>
</ol>
    

