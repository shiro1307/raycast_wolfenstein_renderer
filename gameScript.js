const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const sx = canvas.getAttribute("width");
const sy = canvas.getAttribute("height");

const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

function drawRect(x, y, w, h, color = "black") {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function castRay(angle) {
    let currX = player.x;
    let currY = player.y;

    let tileX = Math.floor(currX);
    let tileY = Math.floor(currY);

    let unitX = Math.cos(angle);
    let unitY = Math.sin(angle);

    if (unitX === 0) unitX = 0.000001;
    if (unitY === 0) unitY = 0.000001;

    let dist = 0;

    let sideX = (unitX < 0 ? currX - tileX : tileX + 1 - currX) / Math.abs(unitX);
    let sideY = (unitY < 0 ? currY - tileY : tileY + 1 - currY) / Math.abs(unitY);

    let delX = Math.abs(1 / unitX);
    let delY = Math.abs(1 / unitY);

    while (true) {

        if (sideX < sideY) {
            dist = sideX;
            tileX += unitX > 0 ? 1 : -1;
            sideX += delX;
        } else {
            dist = sideY;
            tileY += unitY > 0 ? 1 : -1;
            sideY += delY;
        }

        if (
            tileX < 0 || tileX >= mapSizeX ||
            tileY < 0 || tileY >= mapSizeY
        ) {
            return null;
        }

        if (map[tileY][tileX] === 1)
            return { dist, tileX, tileY };
    }
}

function sprayRays(angle, fov = Math.PI / 1.5, rays = 80) {

    for (let i = 0; i < rays; i++) {
        const a = angle - fov / 2 + (i / rays) * fov;

        const ray = castRay(a);

        if (!ray) continue;

        let dfac = Math.pow(ray.dist, 0.8);
        let barheight = sy / dfac;

        let shade = 255 / (1 + ray.dist * 0.3);
        let color = `rgb(${shade}, ${shade}, ${shade})`;

        //console.log(color)
        drawRect(i * (sx / rays) - 1, (sy - barheight) / 2, sx / rays + 2, barheight, color)

        //console.log(ray)

    }

}

function updatePlayer() {

    if (!player) return;

    const moveSpeed = 0.04;
    const rotSpeed = 0.02;

    // Rotation
    if (keys["ArrowLeft"]) {
        console.log(player.angle);
        player.angle -= rotSpeed;
    }
    if (keys["ArrowRight"]) {
        console.log(player.angle);
        player.angle += rotSpeed;
    }

    // Forward / Backward
    let moveX = 0;
    let moveY = 0;

    if (keys["KeyW"]) {
        moveX += Math.cos(player.angle) * moveSpeed;
        moveY += Math.sin(player.angle) * moveSpeed;
    }

    if (keys["KeyS"]) {
        moveX -= Math.cos(player.angle) * moveSpeed;
        moveY -= Math.sin(player.angle) * moveSpeed;
    }

    // Strafing
    if (keys["KeyA"]) {
        moveX += Math.cos(player.angle - Math.PI / 2) * moveSpeed;
        moveY += Math.sin(player.angle - Math.PI / 2) * moveSpeed;
    }

    if (keys["KeyD"]) {
        moveX += Math.cos(player.angle + Math.PI / 2) * moveSpeed;
        moveY += Math.sin(player.angle + Math.PI / 2) * moveSpeed;
    }

    // Collision check (basic)
    const nextX = player.x + moveX;
    const nextY = player.y + moveY;

    if (map[Math.floor(player.y)][Math.floor(nextX)] === 0) {
        player.x = nextX;
    }

    if (map[Math.floor(nextY)][Math.floor(player.x)] === 0) {
        player.y = nextY;
    }
}



function drawMiniMap(x, y, w, h, showRays = true) {

    const tileW = w / mapSizeX;
    const tileH = h / mapSizeY;

    // --- Draw Map Tiles ---
    for (let row = 0; row < mapSizeY; row++) {
        for (let col = 0; col < mapSizeX; col++) {

            const tile = map[row][col];

            ctx.fillStyle = tile === 1 ? "#ffffff" : "#222222";

            ctx.fillRect(
                x + col * tileW,
                y + row * tileH,
                tileW,
                tileH
            );
        }
    }

    // --- Draw Player ---
    const px = x + player.x * tileW;
    const py = y + player.y * tileH;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(px, py, Math.min(tileW, tileH) * 0.2, 0, Math.PI * 2);
    ctx.fill();

    // --- Draw Direction Line ---
    const dirLen = Math.min(tileW, tileH) * 0.8;

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(
        px + Math.cos(player.angle) * dirLen,
        py + Math.sin(player.angle) * dirLen
    );
    ctx.stroke();

    // --- Optional Ray Visualization ---
    if (showRays) {

        const fov = Math.PI / 1.5;
        const rays = 70;

        ctx.strokeStyle = "rgba(255,0,0,0.3)";

        for (let i = 0; i < rays; i++) {

            const angle = player.angle - fov / 2 + (i / rays) * fov;
            const ray = castRay(angle);

            if (!ray) continue;

            const rx = x + ray.tileX * tileW + tileW / 2;
            const ry = y + ray.tileY * tileH + tileH / 2;

            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(rx, ry);
            ctx.stroke();
        }
    }
}