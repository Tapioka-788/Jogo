const zona = document.getElementById('zona');

function criarMeteoro() {
    const meteoro = document.createElement('div');
    meteoro.classList.add('meteoro');
    meteoro.style.position = 'absolute';
    meteoro.style.left = Math.random() * (zona.clientWidth - 80) + 'px';
    meteoro.style.top = '-64px';

    zona.appendChild(meteoro);

    let posY = -64;
    const velocidade = Math.random() * 3 + 1;

    function animar() {
        posY += velocidade;
        meteoro.style.top = posY + 'px';
    
        // Alterando o limite para que atravesse a section
        if (posY < window.innerHeight) { 
            requestAnimationFrame(animar);
        } else {
            meteoro.remove(); // Remove após sair completamente da tela
        }
    }
    

    requestAnimationFrame(animar);
}

// Gera 1 meteoro automaticamente a cada segundo
setInterval(criarMeteoro, 2000);

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'q') {
        criarMeteoro();
    }
});
