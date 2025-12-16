let urlParams = new URLSearchParams(document.location.search);
let idAluno = urlParams.get('id');

async function buscarAlunoPorId() {
    const response = await fetch(`http://localhost:3000/alunos/${idAluno}`)
    const aluno = await response.json();
    
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('cpf').value = aluno.cpf;
    document.getElementById('endereco').value = aluno.endereco;
    document.getElementById('datacadastro').value = aluno.datacadastro;
    document.getElementById('email').value = aluno.email;
    document.getElementById('tel').value = aluno.tel;
}

async function editarAluno(event) {
    // removo o comportamento do submit de atualizar a tela;
    event.preventDefault();

    // Busco o que foi digitado no input nome atraves do seu ID e do atributo value;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const endereco = document.getElementById('endereco').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('tel').value;

    //LOGICA QUE ENVIA O QUE FOI DIGITADO PARA O BANCO DE DADOS VIA API
    const apiUrl = `http://localhost:3000/alunos/${idAluno}`;

    // Monto o objeto aluno que vai ser enviado via api atraves do metodo [PUT/PATCH]

    const aluno = {
        nome,
        cpf,
        endereco,
        email,
        tel
    }

    // Estrutura a requisicao que vai ser enviada pelo fetch 
    const request = new Request(apiUrl, {
        method: 'PATCH',
        body: JSON.stringify(aluno),
        headers: new Headers(
            { 'Content-Type': 'application/json' }
        )
    })

    const response = await fetch(request);
    if(response.ok) {
        const aluno = await response.json();
        alert(`aluno ${aluno.nome} editado com sucesso!`);
        window.location.href = './alunos.html';
    }

}

buscarAlunoPorId();


