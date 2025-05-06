let vida = 2;
const vidaElemento = document.getElementById("vida");

if (!vidaElemento) {
    console.error("Elemento #vida não encontrado no DOM.");
}

// SVGs de vida inicial e secundária
const svgInicial = `
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="48" viewBox="0 0 512 512">
        <path fill="#ff0000"
            d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
    </svg>`;

const svgSecundario = `
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="48" viewBox="0 0 512 512">
        <path fill="#ff0000"
            d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3..." />
    </svg>`;

// Inicializa os corações na tela
vidaElemento.innerHTML = svgInicial + svgInicial;

export function atualizarVida() {
    if (vida > 0) {
        vida--;

        // Substitui o coração inicial pelo secundário
        const coracoes = vidaElemento.children;
        if (coracoes[vida]) {
            coracoes[vida].outerHTML = svgSecundario;
        }

        // Se vida for 0, dispara o evento para o arquivo externo
        if (vida === 0) {
            window.dispatchEvent(new Event("vidaZerada"));
        }
    }
}

export function detectarColisaoMeteoroNave() {
    const meteoros = document.querySelectorAll(".meteoro");
    const naveRect = nave.getBoundingClientRect();

    meteoros.forEach((meteoro) => {
        const meteoroRect = meteoro.getBoundingClientRect();

        if (
            meteoroRect.left < naveRect.right &&
            meteoroRect.right > naveRect.left &&
            meteoroRect.top < naveRect.bottom &&
            meteoroRect.bottom > naveRect.top
        ) {
            console.log("Você foi atingido!");
            meteoro.remove();
            atualizarVida();
        }
    });
}

export function gameLoopVidas() {
    detectarColisaoMeteoroNave();
    requestAnimationFrame(gameLoopVidas);
}

requestAnimationFrame(gameLoopVidas);


