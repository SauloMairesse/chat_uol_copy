let dadoNome;

loginUsuario();

function loginUsuario(){
    let requestName = prompt('Digite seu Nick: ');
    let nome = {
        name: requestName
    }
    dadoNome = requestName;
    console.log(dadoNome)
    if (requestName != null){        
        let promessaLoginUser = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants',{name: `${requestName}`});
        promessaLoginUser.catch(tratarErro);
        promessaLoginUser.then(setInterval(requestMessage,3000)); //solicitar mensagens no servidor
        setInterval(function() {keepUserLoggedIn(nome); }, 5000); //manter usuario logado
    }
}   

function requestMessage(){ //solicitar mensagens do servidor
    let promessaMensagensDoServidor = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promessaMensagensDoServidor.then(printMessage);
}

function printMessage(resposta){
    let mainHTML = document.querySelector('main');
    mainHTML.innerHTML = '';
    for(let i = 0; i < resposta.data.length; i++){
        if(resposta.data[i].to == dadoNome || resposta.data[i].to == 'Todos'){
            mainHTML.innerHTML += `<section>
                                        <ul>
                                            <li data-identifier="message"><b class="hora">(${resposta.data[i].time})</b> <b class="remetente">${resposta.data[i].from}</b> para <b class="destinatario">${resposta.data[i].to}</b>: ${resposta.data[i].text}</li>
                                        </ul>
                                    </section>`;
            if(resposta.data[i].type == "private_message"){
                document.querySelector('main').lastChild.classList.add('private-message')
                }
        }
    mainHTML.lastChild.scrollIntoView();
    }
}

function keepUserLoggedIn(nome){
    let userLogged = axios.post('https://mock-api.driven.com.br/api/v4/uol/status',nome);
}

function tratarErro(erro) {
    console.log("Status code: " + erro.response.status); // Ex: 404
    console.log("Mensagem de erro: " + erro.response.data); // Ex: Not Found
    alert('Nome já em uso. Tente outro.');
    loginUsuario();
}

function sendMessage() {
    let mensagemInput = document.querySelector('.mensagem').value;
    if(mensagemInput != ''){
        const objeto = {from: dadoNome, to: "Todos", text: mensagemInput, type: "message"};
        let enviarMensagem = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages',objeto);
        enviarMensagem.then(requestMessage);
        enviarMensagem.catch(qualquerFunc);
    }
}        

function qualquerFunc() {
    alert('Deu ruim');
    window.location.reload();
}