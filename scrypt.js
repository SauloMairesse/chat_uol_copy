let requestName =  prompt('Qual Seu nome de login ?')
const nome = {
    name: `${requestName} `
}
// loginUsuario();
// function loginUsuario() {
//     let usuario = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants',nome);
//     usuario.then(tratarSucesso)
//     usuario.catch(tratarErro)
// }
let promessaMensagensServidor = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
promessaMensagensServidor.then(mostrarConsole);
function mostrarConsole(resposta){
    console.log(resposta.data);
    const mainHTML = document.querySelector('main');
    for(let i = 0; i <= resposta.data.length; i++){
    mainHTML.innerHTML += `<section>
                                <ul>
                                    <li><b><strong>${resposta.data[i].from}</strong></b> para <b>${resposta.data[i].to}</b>: ${resposta.data[i].texto}</li>
                                </ul>
                            </section>`;
    }
}

// function tratarSucesso(resposta){

    // const mainHTML = document.querySelector('main');
    // mainHTML.innerHTML += `<section>
    //                             <strong>${nome.name}</strong>entrou na sala ...
    //                         </section>`;}
function tratarErro(erro) {
    console.log("Status code: " + erro.response.status); // Ex: 404
    console.log("Mensagem de erro: " + erro.response.data); // Ex: Not Found
    requestName = prompt('Nome já em uso. Tente outro:');
    loginUsuario();
}