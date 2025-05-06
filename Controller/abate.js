export let abates = 0;
const abatesElemento = document.getElementById('abates');
const resultadoElemento = document.getElementById('resultado');

if (!abatesElemento) {
    console.error("Elemento #abates não encontrado no DOM.");
}

export function atualizarAbates() {
    abates++;
    abatesElemento.innerHTML = `<h1 class="txtStatus">Abates: ${abates / 2}</h1>`;

    // Atualiza o espaço do resultado quando o jogo termina
    if (resultadoElemento) {
        resultadoElemento.innerHTML = `<p>Total de Abates: ${abates / 2}</p>`;
    }
}

export function getAbates() {
    return abates;
}

export function detectarColisaoLaserMeteoro() {
    const tiros = document.querySelectorAll('.tiro');
    const meteoros = document.querySelectorAll('.meteoro');

    tiros.forEach((tiro) => {
        const tiroRect = tiro.getBoundingClientRect();

        meteoros.forEach((meteoro) => {
            const meteoroRect = meteoro.getBoundingClientRect();

            if (
                tiroRect.left < meteoroRect.right &&
                tiroRect.right > meteoroRect.left &&
                tiroRect.top < meteoroRect.bottom &&
                tiroRect.bottom > meteoroRect.top
            ) {
                setTimeout(() => {
                    meteoro.remove();
                    tiro.remove();
                }, 0);

                atualizarAbates();
            }
        });
    });
}

export function gameLoopAbates() {
    detectarColisaoLaserMeteoro();
    requestAnimationFrame(gameLoopAbates);
}

requestAnimationFrame(gameLoopAbates);
