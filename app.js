//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
let amigos = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (nome === '') {
        alert("Por favor, insira um nome.");
        return;
    }
    
    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado.");
        return;
    }

    amigos.push(nome);
    atualizarLista();
    input.value = '';
    atualizarEstadoBotoes(); 
}

function removerAmigo(nomeDoAmigo) {
    const index = amigos.indexOf(nomeDoAmigo);
    if (index > -1) {
        amigos.splice(index, 1);
    }
    atualizarLista();
    atualizarEstadoBotoes(); 
}

function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; 

    amigos.forEach((amigo) => {
        const item = document.createElement('li');
        
        const nomeSpan = document.createElement('span');
        nomeSpan.textContent = amigo;
        
        const removerBtn = document.createElement('span');
        removerBtn.textContent = 'x';
        removerBtn.className = 'remover-amigo';
        
        removerBtn.onclick = function() {
            removerAmigo(amigo);
        };
        
        item.appendChild(nomeSpan);
        item.appendChild(removerBtn);

        lista.appendChild(item);
    });
}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para o sorteio!");
        return;
    }

    let listaSorteados = [...amigos];
    let sorteioValido = false;

    while (!sorteioValido) {
        embaralhar(listaSorteados);
        sorteioValido = true;
        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === listaSorteados[i]) {
                sorteioValido = false;
                break;
            }
        }
    }

    exibirResultado(amigos.map((tirador, i) => ({
        tirador: tirador,
        presenteado: listaSorteados[i]
    })));
}

function exibirResultado(resultadoSorteio) {
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = ''; 

    resultadoSorteio.forEach(par => {
        const item = document.createElement('li');
        item.innerHTML = `<strong>${par.tirador}</strong> tirou <strong>${par.presenteado}</strong>`;
        resultadoElement.appendChild(item);
    });
}

function reiniciar() {
    amigos = []; 
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    atualizarEstadoBotoes(); 
}

function atualizarEstadoBotoes() {
    const inputNome = document.getElementById("amigo");
    const btnAdicionar = document.getElementById("btn-adicionar");
    const btnSortear = document.getElementById("btn-sortear");

    if (inputNome.value.trim() === '') {
        btnAdicionar.disabled = true;
        btnAdicionar.style.opacity = '0.5';
        btnAdicionar.style.cursor = 'not-allowed';
    } else {
        btnAdicionar.disabled = false;
        btnAdicionar.style.opacity = '1';
        btnAdicionar.style.cursor = 'pointer';
    }

    if (amigos.length < 2) {
        btnSortear.disabled = true;
        btnSortear.style.opacity = '0.5';
        btnSortear.style.cursor = 'not-allowed';
    } else {
        btnSortear.disabled = false;
        btnSortear.style.opacity = '1';
        btnSortear.style.cursor = 'pointer';
    }
}

const inputAmigo = document.getElementById("amigo");
inputAmigo.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        adicionarAmigo();
    }
});

inputAmigo.addEventListener("keyup", atualizarEstadoBotoes);

window.onload = atualizarEstadoBotoes;
