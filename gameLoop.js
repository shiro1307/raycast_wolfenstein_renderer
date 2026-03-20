let lastTime = performance.now();
let frames = 0;
let timer = 0;

function loop() {
    const now = performance.now();
    const delta = now - lastTime;
    lastTime = now;

    frames++;
    timer += delta;

    if (timer >= 1000) {
        console.log("FPS (uncapped):", frames);
        frames = 0;
        timer = 0;
    }

    updatePlayer();
    drawRect(0, 0, sx, sy, "black");
    sprayRays(player.angle);

    // force continuous execution
    setTimeout(loop, 0);
}

loop();