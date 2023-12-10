function KeyDownHandler(e){
    if (e.key == "a" || e.key == "Left" || e.key === "ArrowLeft"){
        if (Keyboard.Right) Keyboard.Right = false
        Keyboard.Left = true
    }

    if (e.key == "d" || e.key === "Right" || e.key === "ArrowRight"){
        if (Keyboard.Left) Keyboard.Left = false
        Keyboard.Right = true
    }
}

function KeyUpHandler(e){
    if (e.key == "a" || e.key == "Left" || e.key === "ArrowLeft") Keyboard.Left = false
    if (e.key == "d" || e.key === "Right" || e.key === "ArrowRight") Keyboard.Right = false
}

function UpdateSprites(){
    if (!Stop){
        Context.clearRect(0, 0, Canvas.width, Canvas.height)
        let Sprites = [Game.Player, Game.Ball].concat(Game.Sprites)
        Sprites.forEach((s) => s.Update())
    }
}

function GameLoop(){
    window.requestAnimationFrame(GameLoop)

    UpdateSprites()

    if (!Game.isPlaying) return
}