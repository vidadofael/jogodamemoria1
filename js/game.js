const grid = document.querySelector('.grid'); /*selecionando o grid para a criação dos cards dentro dela*/

const personagens = [ /*adicionando as img aos cards */
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];


const createElement = (tag, className) => { 
    const element = document.createElement(tag);
    element.className = className;
    return element; /*quando retornar o elemento ele é salvo nas variáveis abaixo */
}


let primeiraCarta = '';
let segundaCarta = '';


const checandoGanhador = () => {
    const cartasDesabilitadas = document.querySelectorAll('.disabled-card'); /*primeiro procurar quantas cartas desabilitadas existem no jogo*/

    if (cartasDesabilitadas.legth === 20) { /*verifica a quantidade de cartas desabilitadas para dar o alerta de ganha*/
        alert('Parabéns, você acertou todas as cartas!');

    }
}



const checandoCartas = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute('data-character');
    const segundoPersonagem = segundaCarta.getAttribute('data-character');

    if (primeiroPersonagem === segundoPersonagem) {

        primeiraCarta.firstChild.classList.add('disabled-card');
        segundaCarta.firstChild.classList.add('disabled-card');

        primeiraCarta = '';
        segundaCarta = '';

        checandoGanhador();

    }   else {
        setTimeout(() => {

            primeiraCarta.classList.remove('revelar');
            segundaCarta.classList.remove('revelar');

            primeiraCarta = '';
            segundaCarta = ''; /*seta as cartas se o jogador errar, assim ele consegue fazer uma nova tentativa sem ter que atualizar o jogo a cada jogada*/
        }, 500);     

    }
}



const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('revelar')) { /*verifica se a carta já tem a classe revelar*/
        return;
    }

    /*se a carta estiver vazia, ela clica na carta e quardamos essa carta na variável 'primeiraCarta' para comparar com a segunda carta */
    if (primeiraCarta === '') { 
        target.parentNode.classList.add('revelar');
        primeiraCarta = target.parentNode;

    }   else if (segundaCarta === '') {
        target.parentNode.classList.add('revelar');
        segundaCarta = target.parentNode;

        checandoCartas();
    }

    target.parentNode.classList.add('revelar');
}




const createCard = (personagens) => { /*criando os elementos cards em JS e acessa a lista de personagens na criação da carta*/
    const card = createElement('div', 'card'); /*criando const para cada div*/
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../images/${personagens}.png)`;/*aqui coloco a imagem da classe front do css aqui dentro para que o JS selecione essa imagem pra mim */

    /*adicionando o nome da classe a const \ linhas excluídas pois criamos uma const acima que cria o elemento div e card e a associa:
    card.className = 'card';
    front.className = 'face front';
    back.className = 'face back';  */
    
    card.appendChild(front); /*adicionando os filhos da div principal (quem é quem)*/
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    card.setAttribute('data-character', personagens); /*vamos usar para dar um atributo a carta pra depois verificar se são iguais pelo nome da carta na qual o atributo será inserido */

    return card;
}

const loadGame = () => {

    const duplicandoPersonagens = [...personagens,...personagens]; /*duplica as cartas no array */

    const embaralhaArray = duplicandoPersonagens.sort(() => Math.random() -0.5);
    /* Math.random(); como o Math.random só traz mumeros entre 0 e 1, coloquei ele para identificar <0 e >0, ou seja, coloquei ele para calcular 'Math.random() -0.5' pra identificar o resultado como menor ou maior que 0 */

    embaralhaArray.forEach((personagem)=> { /*chama as cartas duplicadas no array já embaralhado na const 'embaralhaArray */
        /*console.log(personagens); teste de array que printa em console todos os elementos do array*/

        const card = createCard(personagem);/*chama a função para criar as cartas baseadas nas imagens que foram colocadas no array */
        grid.appendChild(card); /*colaca a carta dentro do grid*/
    }); /*função anonima para percorrer o array da lista de imagens */
}

loadGame(); /*chama a função para testar array*/


