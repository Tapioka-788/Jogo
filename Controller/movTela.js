export function exibirGameOver() {
    const gameOverSection = document.getElementById("gameOver");

    if (!gameOverSection) {
        console.error("Elemento #gameOver não encontrado no DOM.");
        return;
    } else{
    gameOverSection.style.position = "absolute";
    gameOverSection.style.top = "50%";
    gameOverSection.style.left = "100vw";
    gameOverSection.style.transform = "translateY(-50%)";

    gameOverSection.style.left = "-100vw"; 
    }
}

window.addEventListener("vidaZerada", exibirGameOver);

let gameOver = document.getElementById('gameOver')
let telinhas = document.getElementById('telinhas')

gameOver.appendChild(telinhas)

export function trocarTela(numeroTelinha){
    telinhas.style.left = '-' + numeroTelinha + '00vw';
}


