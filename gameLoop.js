function loop() {

    updatePlayer();

    drawRect(0, 0, sx, sy, "black")
    sprayRays(player.angle);

    //drawMiniMap(0, 0, 400, 400, true);

    requestAnimationFrame(loop);
}
loop();