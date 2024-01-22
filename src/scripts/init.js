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

    Game.Player = P1
    Game.Ball = B1
    
    SetScreen()
    GameLoop()
}

function SetScreen(){
    // GUI stuff idk

    Keyboard.Left = Keyboard.Right = false
    Keyboard.SavedLeft = Keyboard.SavedRight = false
    
    Game.Sprites = []
    Game.Ball.Velocity = Pair(0, 0)
    Game.Score = 0

    Game.Computer = false
    Game.Test = false
    
    UpdateScore(0)

    Settings.RectRange = [Pair(0, ~~(Canvas.height/15)), Pair(Canvas.width, ~~(Canvas.height/5*2))]
    Game.Frame = 0
    
    // Game.Computer = true

    SpawnRectField()
    SpawnSprites()

    Game.isPlaying = true
}

function SpawnSprites(){
    P1.Center(~~(Canvas.width/2), ~~(Canvas.height/8*7))
    B1.Center(~~(Canvas.width/2), ~~(Canvas.height/2))
}