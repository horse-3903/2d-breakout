function KeyDownHandler(e){
    if (e.key == "a" || e.key == "Left" || e.key === "ArrowLeft") Keyboard.Left = true
    if (e.key == "d" || e.key === "Right" || e.key === "ArrowRight") Keyboard.Right = true
}

function KeyUpHandler(e){
    if (e.key == "a" || e.key == "Left" || e.key === "ArrowLeft") Keyboard.Left = false
    if (e.key == "d" || e.key === "Right" || e.key === "ArrowRight") Keyboard.Right = false
}

function GameLoop(){
    window.requestAnimationFrame(GameLoop)

    Context.clearRect(0, 0, Canvas.width, Canvas.height)

    Game.Sprites.forEach(i => i.Update())

    if (!Game.isPlaying) return
}