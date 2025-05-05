const nave = document.getElementById('nave');
const area = document.getElementById('areaDeVoo');
const section = document.querySelector('section');

let lastFireTime = 0; 

function laser(posX, posY) {
    let tiro = document.createElement('div');
    tiro.className = 'tiro';
  
    tiro.style.position = 'absolute';
    tiro.style.left = `${posX + nave.offsetWidth / 2 - 0.1}px`;
    tiro.style.top = `${posY - 50}px`;
  
    area.appendChild(tiro);
  
    let laserInterval = setInterval(() => {
      let tiroTop = parseInt(tiro.style.top);

      if (tiroTop >= section.offsetHeight) { 
        clearInterval(laserInterval);
        tiro.remove();
      } else {
        tiro.style.top = `${tiroTop - 10}px`;
      }
    }, 16);
}
  
if (!nave || !area || !section) {
    console.error('Elemento #nave, #areaDeVoo ou #section não encontrado no DOM.');
} else {
    const step = 10;
    const pressedKeys = new Set();
  
    let posX = (area.clientWidth - nave.clientWidth) / 2;
    let posY = (area.clientHeight - nave.clientHeight) / 2;
  
    nave.style.left = `${posX}px`;
    nave.style.top = `${posY}px`;
  
    function moverNave() {
      const areaWidth = area.clientWidth;
      const areaHeight = area.clientHeight;
      const naveWidth = nave.clientWidth;
      const naveHeight = nave.clientHeight;
  
      if (pressedKeys.has('a') && posX > 0) posX -= step;
      if (pressedKeys.has('d') && posX < areaWidth - naveWidth) posX += step;
      if (pressedKeys.has('w') && posY > 0) posY -= step;
      if (pressedKeys.has('s') && posY < areaHeight - naveHeight) posY += step;
  
      posX = Math.max(0, Math.min(posX, areaWidth - naveWidth));
      posY = Math.max(0, Math.min(posY, areaHeight - naveHeight));
  
      nave.style.left = `${posX}px`;
      nave.style.top = `${posY}px`;
    }

    document.addEventListener('keydown', (event) => {
        const tecla = event.key.toLowerCase();
        
        if (['w', 'a', 's', 'd'].includes(tecla)) {
            pressedKeys.add(tecla);
        }

        if (event.key === ' ' && (Date.now() - lastFireTime) >= 500) {
            lastFireTime = Date.now(); 
            laser(posX, posY); 
        }
    });
  
    document.addEventListener('keyup', (event) => {
        const tecla = event.key.toLowerCase();
        if (pressedKeys.has(tecla)) {
            pressedKeys.delete(tecla);
        }
    });
  
    function gameLoop() {
        moverNave();
        requestAnimationFrame(gameLoop);
    }
  
    requestAnimationFrame(gameLoop);
}
