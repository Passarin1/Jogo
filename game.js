// Variáveis globais para armazenar o estado do jogo
let currentScene = 0; // Controla em qual parte da história o jogador está
let inventory = [];   // Inventário do jogador
let stats = {         // Perícias do jogador
    força: 0,
    destreza: 0,
    agilidade: 0,
    luta: 0,
    contraAtaque: 0,
    vigor: 0,
    inteligência: 0,
    lábia: 0,
    psicologia: 0,
    percepção: 0,
    intimidar: 0,
    carisma: 0,
    poder: 0,
    sorte: 0,
    medicina: 0,
    primeirosSocorros: 0,
    pontaria: 0,
    correr: 0,
    furtividade: 0,
};

// Função que exibe a primeira cena do jogo
function startGame() {
    currentScene = 1;
    showDialogue("O sol se põe lentamente sobre o vilarejo de Eldoria...");
    showOptions([
        { text: "Continuar", action: scene1 }
    ]);
}

// Função para exibir diálogos
function showDialogue(text) {
    document.getElementById("dialogue").innerText = text;
}

// Função para exibir as opções de escolha
function showOptions(options) {
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ''; // Limpa as opções anteriores
    options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.onclick = option.action;
        optionsContainer.appendChild(button);
    });
}

// Exemplo de uma cena do jogo
function scene1() {
    showDialogue("Vocês se encontram na pequena taverna 'O Lobo Adormecido'...");
    showOptions([
        { text: "Falar com o emissário", action: emissaryConversation },
        { text: "Ignorar o emissário", action: endGame }
    ]);
}

// Conversa com o emissário
function emissaryConversation() {
    showDialogue("'Vocês são os que buscam aventuras, não é?' - o emissário da Ordem dos Arcanistas de Valthoria pergunta.");
    showOptions([
        { text: "Aceitar a missão", action: acceptMission },
        { text: "Recusar a missão", action: endGame }
    ]);
}

// Função que é chamada se o jogador aceitar a missão
function acceptMission() {
    showDialogue("Vocês aceitam a missão e começam os preparativos para a jornada.");
    showOptions([{ text: "Continuar", action: scene2 }]);
}

// Função que é chamada se o jogador recusar a missão ou encerrar o jogo
function endGame() {
    showDialogue("Vocês decidem não seguir a missão. O jogo termina aqui.");
    showOptions([{ text: "Reiniciar", action: startGame }]);
}

// Iniciar o jogo quando o botão for clicado
document.getElementById("startGameBtn").onclick = startGame;


function handleOption(optionIndex) {
    switch (optionIndex) {
        case 0: // Falar com o emissário
            showDialog("O emissário, com sua túnica adornada com símbolos arcanos, caminha em sua direção com passos firmes. 'A situação é grave. Criaturas das sombras estão se levantando das ruínas antigas. Precisamos de corajosos para lidar com essa ameaça.'");
            showOptions(["Perguntar sobre as criaturas", "Oferecer ajuda", "Recusar educadamente"]);
            break;
        case 1: // Explorar a taverna
            showDialog("Você sente o calor do fogo na lareira e escuta as conversas ao fundo. As chamas crepitam suavemente, enquanto o cheiro de carne assada preenche o ambiente. Alguns aventureiros o observam, talvez avaliando suas capacidades.");
            showOptions(["Falar com o bardo", "Observar o taberneiro"]);
            break;
        case 2: // Sair da taverna
            showDialog("Você abre a porta pesada de madeira e sai para as ruas de Eldoria. A noite já está caindo, e uma fina neblina cobre as pedras da calçada. À distância, você ouve o barulho do rio passando.");
            showOptions(["Seguir em direção ao mercado", "Explorar os arredores da cidade", "Voltar para a taverna"]);
            break;
        case 3: // Perguntar sobre as criaturas
            showDialog("'Criaturas corrompidas por magia antiga,' responde o emissário. 'Alguns dizem que foram humanos outrora, mas agora são bestas incontroláveis, sedentas por sangue.'");
            showOptions(["Perguntar sobre a missão", "Retornar à taverna"]);
            break;
    }
}
// Função para exibir os pontos restantes ao jogador
function showRemainingPoints() {
    const remainingPoints = 600 - Object.values(player.attributes).reduce((a, b) => a + b, 0);
    alert(`Pontos restantes: ${remainingPoints}`);
}

// Atualiza a função de criação de personagem para incluir a verificação de pontos
function createCharacter() {
    // Reseta atributos
    player.attributes = {
        Força: 0,
        Destreza: 0,
        Agilidade: 0,
        Luta: 0,
        ContraAtaque: 0,
        Vigor: 0,
        Inteligência: 0,
        Lábia: 0,
        Psicologia: 0,
        Percepção: 0,
        Intimidar: 0,
        Carisma: 0,
        Poder: 0,
        Sorte: 0,
        Medicina: 0,
        PrimeirosSocorros: 0,
        Pontaria: 0,
        Correr: 0,
        Furtividade: 0
    };

    player.name = prompt("Digite o nome do seu personagem:");

    // Loop para distribuição de pontos
    while (true) {
        showRemainingPoints();
        const skill = prompt("Escolha uma perícia para aumentar (Força, Destreza, Agilidade, etc.) ou digite 'sair' para finalizar:");
        
        if (skill === 'sair') break;

        if (player.attributes[skill] !== undefined) {
            const pointsToAdd = parseInt(prompt(`Quantos pontos você deseja adicionar a ${skill}? (Máximo de 80 por perícia)`));
            if (pointsToAdd + player.attributes[skill] > 80) {
                alert("Você não pode exceder 80 pontos em uma perícia.");
            } else {
                player.attributes[skill] += pointsToAdd;
            }
        } else {
            alert("Perícia inválida. Tente novamente.");
        }
    }

    alert(`Personagem ${player.name} criado com sucesso!\nAqui estão suas perícias:\n` + 
          Object.entries(player.attributes).map(([skill, value]) => `${skill}: ${value}`).join('\n'));
    
    // Chama a função para mostrar a imagem do personagem
    showCharacterImage();
}
