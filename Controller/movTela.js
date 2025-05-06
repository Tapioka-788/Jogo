document.addEventListener("DOMContentLoaded", () => {
    const gameOverSection = document.getElementById("gameOver");

    if (!gameOverSection) {
        console.error("Elemento #gameOver não encontrado no DOM.");
        return;
    }

    // Estiliza a tela de Game Over inicialmente
    gameOverSection.style.position = "absolute";
    gameOverSection.style.top = "50%";
    gameOverSection.style.left = "100vw"; // Inicialmente fora da tela
    gameOverSection.style.transform = "translateY(-50%)";

    function exibirGameOver() {
        gameOverSection.style.left = "0vw"; // Move para dentro da tela
    }

    // Ouve o evento disparado pelo arquivo de vida
    window.addEventListener("vidaZerada", exibirGameOver);
});

