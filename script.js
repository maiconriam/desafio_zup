const cartoes = document.querySelectorAll('.container'); 

gerarValorAleatorio = () => {
    return Math.floor(Math.random() * 671);
}

buscaPersonagem = () => {
    let numeroAleatorio = gerarValorAleatorio();
    return fetch(`https://rickandmortyapi.com/api/character/${numeroAleatorio}`, {
        method:'GET', 
        headers: {
            Accept: 'application/json',
            "Content-type": 'application/json'
        }
    }).then((response) => response.json() ).then((data) => {
        return data;
    });
}

definirStatus = (statusAPI, cartao) => {
    let elementoStatus = cartao.querySelector('#status');
    let elementoIcone = cartao.querySelector('#icon-status');
    elementoStatus.textContent = statusAPI;

    if(statusAPI === 'Alive') {
        elementoIcone.className = 'status_Alive';
        return
    }
    if(statusAPI === 'Dead') {
        elementoIcone.className = 'status_Dead';
        return
    }
    return elementoIcone.className = 'status_Unknown';
}

carregaCartoes = async() => {
    for (let i=0; i<cartoes.length; i++){
        let personagem = await buscaPersonagem();
        let imagem = cartoes[i].querySelector('#imagem');
        let nome = cartoes[i].querySelector('#nome');
        let especie = cartoes[i].querySelector('#especie');

        imagem.src = personagem.image;
        nome.textContent = personagem.name;
        especie.textContent = `Specie: ${personagem.species}`;
        definirStatus(personagem.status, cartoes[i]);
    }
    document.getElementById('loader').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
}