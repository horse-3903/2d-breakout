var Canvas, Context
var Stop = false

window.onload = () => {
    Canvas = document.getElementById("Canvas")

    Canvas.width = window.innerWidth
    Canvas.height = window.innerHeight
    
    Canvas.style.width = Canvas.width + "px"
    Canvas.style.height = Canvas.height + "px"

    Context = Canvas.getContext("2d")
    document.addEventListener("keydown", KeyDownHandler, false);
    document.addEventListener("keyup", KeyUpHandler, false);

    Keyboard.Left = Keyboard.Right = false
    Game.Player = P1
    Game.Ball = B1

    SpawnSprites()
    GameLoop()
}

function SetScreen(){
    // GUI stuff idk
    return
}

function SpawnSprites(){
    P1.Center(~~(Canvas.width/2), ~~(Canvas.height/8*7))
    B1.Center(~~(Canvas.width/2), ~~(Canvas.height/3))

    B1.SetVelocity()

    Game.isPlaying = true
}