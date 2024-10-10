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
let playerPosition = { x: 6, y: 2 }; // Posição do jogador
let enemyPosition = { x: 6, y: 11 }; // Posição do inimigo
let enemyHealth = 40; // Vida do inimigo
let playerHealth = 100; // Vida do jogador
let playerActions = 3; // Ações por turno

// Função para desenhar o grid
function drawGrid() {
    const gridElement = document.querySelector(".grid");
    gridElement.innerHTML = ""; // Limpa o grid para redesenhar

    for (let row = 0; row < 14; row++) {
        for (let col = 0; col < 14; col++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');

            // Adicionar imagem do jogador
            if (row === playerPosition.y && col === playerPosition.x) {
                const playerImg = document.createElement('img');
                playerImg.src = 'player.png'; // Coloque o caminho da imagem do jogador
                playerImg.classList.add('player-image');
                cell.appendChild(playerImg);
            }

            // Adicionar imagem do inimigo
            if (row === enemyPosition.y && col === enemyPosition.x) {
                const enemyImg = document.createElement('img');
                enemyImg.src = 'enemy.png'; // Coloque o caminho da imagem do inimigo
                enemyImg.classList.add('enemy-image');
                cell.appendChild(enemyImg);
            }

            gridElement.appendChild(cell);
        }
    }
}

// Função para registrar ações
function logAction(message) {
    const log = document.getElementById("log");
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight;
}

// Função de movimentação
function move(direction) {
    if (playerActions === 0) {
        logAction("Ação esgotada! Aguarde o próximo turno.");
        return;
    }

    let newPosition = { ...playerPosition };
    if (direction === 'up' && playerPosition.y > 0) newPosition.y--;
    if (direction === 'down' && playerPosition.y < 13) newPosition.y++;
    if (direction === 'left' && playerPosition.x > 0) newPosition.x--;
    if (direction === 'right' && playerPosition.x < 13) newPosition.x++;

    playerPosition = newPosition;
    drawGrid();
    playerActions--;
    logAction(`Você se moveu para ${direction}. Ações restantes: ${playerActions}`);
}

// Função de ataque
function attack() {
    if (playerActions === 0) {
        logAction("Ação esgotada! Aguarde o próximo turno.");
        return;
    }

    const distance = Math.abs(playerPosition.x - enemyPosition.x) + Math.abs(playerPosition.y - enemyPosition.y);
    if (distance === 1) {
        // Cálculo de dano do ataque
        let damage = Math.floor(Math.random() * 10) + 1; // Dano aleatório de 1 a 10
        enemyHealth -= damage;
        logAction(`Você atacou o inimigo e causou ${damage} de dano! Vida do inimigo: ${enemyHealth}`);
        if (enemyHealth <= 0) {
            enemyDefeated();
        }
    } else {
        logAction("Você está longe demais para atacar!");
    }

    playerActions--;
}

// Função de uso de magia
function useMagic() {
    if (playerActions === 0) {
        logAction("Ação esgotada! Aguarde o próximo turno.");
        return;
    }

    const distance = Math.abs(playerPosition.x - enemyPosition.x) + Math.abs(playerPosition.y - enemyPosition.y);
    if (distance <= 3) { // Magia pode ser usada a uma distância de até 3
        let magicDamage = Math.floor(Math.random() * 15) + 5; // Dano aleatório de 5 a 20
        enemyHealth -= magicDamage;
        logAction(`Você lançou uma magia e causou ${magicDamage} de dano! Vida do inimigo: ${enemyHealth}`);
        if (enemyHealth <= 0) {
            enemyDefeated();
        }
    } else {
        logAction("Você está longe demais para usar magia!");
    }

    playerActions--;
}

// Função para usar perícias
function useSkill(skill) {
    if (playerActions === 0) {
        logAction("Ação esgotada! Aguarde o próximo turno.");
        return;
    }

    switch (skill) {
        case 'Força':
            logAction("Você usou Força, aumentando seu poder de ataque temporariamente!");
            break;
        case 'Inteligência':
            logAction("Você usou Inteligência para avaliar a situação!");
            break;
        case 'Destreza':
            logAction("Você usou Destreza para esquivar de um ataque!");
            break;
        case 'Carisma':
            logAction("Você usou Carisma para tentar distrair o inimigo!");
            break;
        case 'Vigor':
            logAction("Você usou Vigor para resistir a ataques!");
            break;
        default:
            logAction("Perícia não reconhecida.");
            break;
    }

    playerActions--;
}

// Função para finalizar o turno
function endTurn() {
    playerActions = 3;
    logAction("Novo turno! Ações restauradas.");
    enemyAttack();
    drawGrid();
}

// Função para ataque do inimigo
function enemyAttack() {
    if (enemyHealth > 0) {
        const distance = Math.abs(playerPosition.x - enemyPosition.x) + Math.abs(playerPosition.y - enemyPosition.y);
        if (distance === 1) {
            let enemyDamage = Math.floor(Math.random() * 10) + 1; // Dano aleatório do inimigo
            playerHealth -= enemyDamage;
            logAction(`O inimigo atacou e causou ${enemyDamage} de dano! Vida do jogador: ${playerHealth}`);
            if (playerHealth <= 0) {
                logAction("Você foi derrotado!");
            }
        } else {
            logAction("O inimigo não pode te alcançar!");
        }
    }
}

// Função para inimigo derrotado
function enemyDefeated() {
    logAction("Você derrotou o inimigo!");
    enemyHealth = 0; // Define a vida do inimigo como 0
}

// Inicialização
drawGrid();
