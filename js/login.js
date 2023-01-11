const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');

/*verificação de habilitação de botão jogar e validação de quantidade de caracteres*/
const validateInput = ({target}) => {
    if(target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }  
    button.setAttribute('disabled', '');
}

input.addEventListener('input', validateInput);


/* salvando nome para próxima tela*/
const handleSubmit = (event) => {
    event.preventDefault(); /* bloqueia o evento do formulario de atualizar e apagar os dados digitados */
    console.log('logando...'); /*tag para testes apenas, pode ser removido do código. */
    console.log(input.value); /*printa no console o que o usuário digitou*/
    localStorage.setItem('player', input.value);/*salva o nome do jogador na memoria local do navegador na chave 'player'*/
    window.location = 'pages/game.html';
}
input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);