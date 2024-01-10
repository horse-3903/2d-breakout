const P1 = new PlayerSprite("#1FEA00", 0, 0, 150, 15)
const B1 = new BallSprite("1FEA00", 0, 0, 7)

function KeyDownHandler(e){
    if (e.key == "a" || e.key == "Left" || e.key === "ArrowLeft"){
        if (Keyboard.Right){
            Keyboard.Right = false
            Keyboard.SavedRight = true
        }
        
        Keyboard.Left = true
    }

    if (e.key == "d" || e.key === "Right" || e.key === "ArrowRight"){
        if (Keyboard.Left){
            Keyboard.Left = false
            Keyboard.SavedLeft = true
        }
        
        Keyboard.Right = true
    }
}

function KeyUpHandler(e){
    if (e.key == "a" || e.key == "Left" || e.key === "ArrowLeft"){
        Keyboard.Left = false

        if (Keyboard.SavedRight){
            Keyboard.SavedRight = false
            Keyboard.Right = true
        }

        if (Keyboard.SavedLeft)
            Keyboard.SavedLeft = false
    }

    if (e.key == "d" || e.key === "Right" || e.key === "ArrowRight"){
        Keyboard.Right = false
        
        if (Keyboard.SavedLeft){
            Keyboard.SavedLeft = false
            Keyboard.Left = true
        }

        if (Keyboard.SavedRight)
            Keyboard.SavedRight = false
    }
}

function UpdateSprites(){
    Context.clearRect(0, 0, Canvas.width, Canvas.height)
    
    let Sprites = [Game.Player, Game.Ball].concat(...Game.Sprites)
    Sprites.forEach((s) => s.Update())
}

function SpawnRectField(){
    const ColourPalette = ["#70ff00","#82ff04","#93ff00","#a5ff00","#b7ff00","#c8ff00","#d9ff00","#ebff00"]
    const Layers = (Settings.RectRange[1].Y - Settings.RectRange[0].Y - Settings.RectMargin) / (Settings.RectHeight + Settings.RectMargin)
    const ValidWidth = Settings.RectRange[1].X - Settings.RectRange[0].X

    let CurPosY = Settings.RectRange[0].Y + Settings.RectMargin

    for (let i = 0; i < Layers; i++){
        let CurLayer = []
        let CurPosX = Settings.RectMargin
        let LayerColour = ColourPalette[i]

        while (ValidWidth - CurPosX > Settings.RectMargin * 3 + Settings.RectMinLength * 2){
            let CurWidth = RandVal(
                Settings.RectMinLength, 
                Math.min(ValidWidth - CurPosX - Settings.RectMargin * 2 - Settings.RectMinLength, Settings.RectMinLength * 10)
            )

            CurLayer.push(
                new RectSprite(
                    LayerColour,
                    CurPosX, CurPosY,
                    CurWidth, Settings.RectHeight
                )
            )

            CurPosX += CurWidth + Settings.RectMargin
        }

        CurLayer.push(
            new RectSprite(
                LayerColour,
                CurPosX, CurPosY, 
                ValidWidth - Settings.RectMargin - CurPosX, Settings.RectHeight
            )
        )

        CurPosY += Settings.RectHeight + Settings.RectMargin    

        Game.Sprites.push(CurLayer)
    }

    // test block
    // Game.Sprites.push(
    //     new RectSprite(
    //         "70ff00",
    //         Settings.RectRange[1].X / 4, Settings.RectRange[0].Y, 
    //         Settings.RectRange[1].X / 2, Settings.RectHeight
    //     )
    // )
}

function GameLoop(){
    window.requestAnimationFrame(GameLoop)

    Game.Frame += 1

    if (!Game.isPlaying) 
        return

    UpdateSprites()

    if (Game.Frame < 50)
        Game.Ball.Blink()
    else if (Game.Frame == 50)
        Game.Ball.SetVelocity()
}

