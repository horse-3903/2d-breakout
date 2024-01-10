var Canvas, Context

window.onload = () => {
    Canvas = document.getElementById("Canvas")

    Canvas.width = window.innerWidth
    Canvas.height = window.innerHeight
    
    Canvas.style.width = Canvas.width + "px"
    Canvas.style.height = Canvas.height + "px"

    Context = Canvas.getContext("2d")
    document.addEventListener("keydown", KeyDownHandler, false);
    document.addEventListener("keyup", KeyUpHandler, false);
    
    SetScreen()
    GameLoop()
}

function SetScreen(){
    // GUI stuff idk
    Keyboard.Left = Keyboard.Right = false
    Keyboard.SavedLeft = Keyboard.SavedRight = false

    Game.Player = P1
    Game.Ball = B1
    Game.Ball.Velocity = Pair(0, 0)
    Game.Sprites = []

    Settings.RectRange = [Pair(0, ~~(Canvas.height/15)), Pair(Canvas.width, ~~(Canvas.height/5*2))]
    Game.Frame = 0

    SpawnRectField()
    SpawnSprites()
}

function SpawnSprites(){
    P1.Center(~~(Canvas.width/2), ~~(Canvas.height/8*7))
    B1.Center(~~(Canvas.width/2), ~~(Canvas.height/2))

    Game.isPlaying = true
}