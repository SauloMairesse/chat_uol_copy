loginUsuario();

function loginUsuario(){
    let requestName = prompt('Digite seu Nick: ');
    let nome = {
        name: `${requestName}`
    }
    if (requestName != null){        
        let promessaLoginUser = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants',{name: `${requestName}`});
        promessaLoginUser.catch(tratarErro);
        promessaLoginUser.then(setInterval(requestMensage,3000));
        //setInterval(manterUsuarioON(nome),5000)
        setInterval(function() {manterUsuarioON(nome); }, 5000);
    }
}   

function requestMensage(){
    let promessaMensagensDoServidor = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promessaMensagensDoServidor.then(mostrarConsoleEntrada);
}

function mostrarConsoleEntrada(resposta){
    let mainHTML = document.querySelector('main');
    mainHTML.innerHTML = '';
    for(let i = 0; i < resposta.data.length; i++){
            mainHTML.innerHTML += `<section>
                                        <ul>
                                            <li><b>${resposta.data[i].time}</b> <b><strong>${resposta.data[i].from}</strong></b> para <b>${resposta.data[i].to}</b>: ${resposta.data[i].text}</li>
                                            <li>${resposta.data[i].type}</li>
                                        </ul>
                                    </section>`;
    }
    console.log('Mostrando')
    // mainHTML.lastChild.scrollIntoView();
}

function manterUsuarioON(nome){
    let usuarioOn = axios.post('https://mock-api.driven.com.br/api/v4/uol/status',nome);
    usuarioOn.then(console.log('Estou online'));
}

function tratarErro(erro) {
    console.log("Status code: " + erro.response.status); // Ex: 404
    console.log("Mensagem de erro: " + erro.response.data); // Ex: Not Found
    alert('Nome já em uso. Tente outro.');
    loginUsuario();
}
