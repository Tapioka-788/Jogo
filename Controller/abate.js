let abates = 0;
const abatesElemento = document.getElementById('abates');

if (!abatesElemento) {
    console.error("Elemento #abates não encontrado no DOM.");
}

function atualizarAbates() {
    abates++;
    
    if (abatesElemento) {
        abatesElemento.innerHTML = `<h1 class="txtStatus">Abates: ${abates}</h1>`;
    }
}

function detectarColisaoLaserMeteoro() {
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
                    atualizarAbates();
                }, 0);
            }
        });
    });
}

function gameLoopAbates() {
    detectarColisaoLaserMeteoro();
    requestAnimationFrame(gameLoopAbates);
}

requestAnimationFrame(gameLoopAbates);
