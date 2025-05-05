const
    STAR_SIZE = 3,
    STAR_MIN_SCALE = 0.2,
    OVERFLOW_THRESHOLD = 50;
const canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

let textBlock;
function tbUpdate() {
    textBlock = {
        textDisplayed: " ",
        yf: canvas.height / 2,
        yi: canvas.height / 2 - 85,
    };
    context.font = "6vw helvetica";
    context.fillStyle = "white";
    textBlock.textWidth = context.measureText(textBlock.textDisplayed).width;
    textBlock.xi = canvas.width / 2 - textBlock.textWidth / 2;
    textBlock.xf = textBlock.xi + textBlock.textWidth;
}
let scale = 1,
    width,
    height;

let stars = [];

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

const pressedKeys = new Set();
const keyboardSpeed = 2;

resize();
initStars(300); // <- gera 300 estrelas ao iniciar
step();

window.onresize = resize;
canvas.onclick = canvasClickHandler;

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    pressedKeys.add(key);
});
document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    pressedKeys.delete(key);
});

function initStars(count) {
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
    }
}

function updateKeyboardVelocity() {
    velocity.tx = 0;
    velocity.ty = 0;

    if (pressedKeys.has('w')) velocity.ty -= keyboardSpeed;
    if (pressedKeys.has('s')) velocity.ty += keyboardSpeed;
    if (pressedKeys.has('a')) velocity.tx -= keyboardSpeed;
    if (pressedKeys.has('d')) velocity.tx += keyboardSpeed;
}

function canvasClickHandler(evnt) {
    let xi = canvas.getBoundingClientRect().left;
    let yi = canvas.getBoundingClientRect().top;
    let xcanv = evnt.clientX - xi;
    let ycanv = evnt.clientY - yi;
    let nameClicked = !!(
        textBlock.xi < xcanv &&
        textBlock.xf > xcanv &&
        textBlock.yi < ycanv &&
        textBlock.yf > ycanv
    );
    if (nameClicked) {
        placeStar();
    }
}

function placeStar() {
    for (let x = textBlock.xi; x < textBlock.xf; x += 100) {
        for (let y = textBlock.yi; y < textBlock.yf; y += 35) {
            stars.push({
                x,
                y,
                z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
            });
        }
    }
}

function recycleStar(star) {
    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
    star.x = Math.random() * width;
    star.y = Math.random() * height;
}

function resize() {
    width = window.innerWidth * scale;
    height = window.innerHeight * scale;
    canvas.width = width;
    canvas.height = height;
    tbUpdate();
}

function step() {
    context.clearRect(0, 0, width, height);
    updateKeyboardVelocity();
    update();
    render();
    requestAnimationFrame(step);
}

function update() {
    velocity.x += (velocity.tx - velocity.x) * 0.1;
    velocity.y += (velocity.ty - velocity.y) * 0.1;

    stars.forEach(star => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        if (
            star.x < -OVERFLOW_THRESHOLD ||
            star.x > width + OVERFLOW_THRESHOLD ||
            star.y < -OVERFLOW_THRESHOLD ||
            star.y > height + OVERFLOW_THRESHOLD
        ) {
            recycleStar(star);
        }
    });
}

function render() {
    stars.forEach(star => {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.strokeStyle =
            "rgba(255,255,255," + (0.5 + 0.5 * Math.random()) + ")";
        context.moveTo(star.x, star.y);
        let tailX = velocity.x * 2;
        let tailY = velocity.y * 2;
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;
        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
    });

    context.fillText(textBlock.textDisplayed, textBlock.xi, textBlock.yf);
}
