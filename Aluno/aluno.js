const tabelaResultado = document.getElementById('tabelaResultado');

async function cadastrarAluno(event) {
    // removo o comportamento do submit de atualizar a tela;
    event.preventDefault();

    // Busco o que foi digitado no input nome atraves do seu ID e do atributo value;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const datacadastro = document.getElementById('datacadastro').value;
    const endereco = document.getElementById('endereco').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('tel').value;

    //LOGICA QUE ENVIA O QUE FOI DIGITADO PARA O BANCO DE DADOS VIA API
    const apiUrl = 'http://localhost:3000/alunos';

    // Monto o objeto aluno que vai ser enviado via api atraves do metodo [POST]

    const aluno = {
        nome,
        cpf,
        datacadastro,
        endereco,
        email,
        tel
    }

    //[GET], [POST], [PUT], [DELETE]

    // Estrutura a requisicao que vai ser enviada pelo fetch 
    const request = new Request(apiUrl, {
        method: 'POST',
        body: JSON.stringify(aluno),
        headers: new Headers(
            { 'Content-Type': 'application/json' }
        )
    })

    const response = await fetch(request);
    
    if(response.ok) {
        alert('Cadastrado com sucesso');
        window.location.href = './alunos.html';
    }
}

async function listarAlunos() {
    // promisse 1 (requisicao foi ok ou nao)
    const response = await fetch('http://localhost:3000/alunos'); //GET - BUSCAR OS ALUNOS
    // promisse 2 (o resultado da requisicao)
    const alunos = await response.json(); 

    alunos.forEach(function (aluno) {
        tabelaResultado.insertAdjacentHTML('beforeend',
            `
            <tr>
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.cpf}</td>
                <td>${aluno.email}</td>
                <td>${aluno.tel}</td>
                <td>${aluno.datacadastro}</td>
                <td>
                    <button class="btn btn-sm btn-info text-white me-1">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                    <a href="./edicao.html?id=${aluno.id}" class="btn btn-sm btn-warning text-white me-1">
                        <i class="bi bi-pencil-fill"></i>
                    </a>
                    <button class="btn btn-sm btn-danger" onclick="excluirAluno('${aluno.id}')">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
            `
        )
    })
}

async function excluirAluno(id) {
    const apiUrl = `http://localhost:3000/alunos/${id}`;
    
    // Estrutura da requisicao do DELETE
    const request = new Request (apiUrl, {
        method: 'DELETE'
    })

    if(confirm(`Deseja excluir o usuario ${id} ?`)){
        const response = await fetch(request);
        const aluno = await response.json();
        
        tabelaResultado.innerHTML = '';
        listarAlunos();
    }
    
}

listarAlunos();


