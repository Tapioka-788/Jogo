import { atualizarVida, detectarColisaoMeteoroNave, gameLoopVidas } from "./../../Controller/vida.js";
import { criarMeteoro } from "./../Controller/chuva.js"
import { atualizarAbates, detectarColisaoLaserMeteoro, gameLoopAbates } from "./../Controller/abate.js"
import { trocarTela, exibirGameOver } from "./movTela.js";

window.atualizarVida = atualizarVida;
window.detectarColisaoMeteoroNave = detectarColisaoMeteoroNave;
window.gameLoopVidas = gameLoopVidas;

window.trocarTela = trocarTela;
window.exibirGameOver = exibirGameOver;

window.atualizarAbates = atualizarAbates;
window.detectarColisaoLaserMeteoro = detectarColisaoLaserMeteoro;
window.gameLoopAbates = gameLoopAbates;

document.addEventListener("DOMContentLoaded", () => {
    console.log("Game Manager inicializado!");

    gameLoopAbates();
    gameLoopVidas();
    criarMeteoro();
});