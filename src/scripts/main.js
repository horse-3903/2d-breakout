const P1 = new PlayerSprite("#1FEA00", 0, 0, 175, 15)
const B1 = new BallSprite("#1FEA00", 0, 0, 7)

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

function UpdateScore(score = null){
    if (score == null){
        Game.Score += 1
        score = Game.Score
    }

    Game.Score = score
    // document.getElementById("score").innerText = "Score : " + Game.Score
}

function ToDestroy(){
    let ToDestroy = Game.Sprites.filter((r) => r.Destroy && !r.Immune)
    // console.log(ToDestroy.length)
    
    if (ToDestroy.length == 1){
        ToDestroy[0].Active = false
        ToDestroy[0].Destroy = false
        Game.ActiveSprites -= 1
    } else if (ToDestroy.length > 1){
        let Index = ~~RandVal(0, ToDestroy.length)
        ToDestroy[Index].Active = false
        for (let i = 0; i < ToDestroy.length; i++){
            if (i != Index)
                ToDestroy[i].Immune = true
        }
        ToDestroy.forEach((v) => v.Destroy = false)
        Game.ActiveSprites -= 1
    } 
}

function SpawnRectField(){
    if (!Game.Test){
        const ColourPalette = ["#70ff00","#82ff04","#93ff00","#a5ff00","#b7ff00","#c8ff00","#d9ff00","#ebff00"]
        const Layers = (Settings.RectRange[1].Y - Settings.RectRange[0].Y - Settings.RectMargin) / (Settings.RectHeight + Settings.RectMargin)
        const ValidWidth = Settings.RectRange[1].X - Settings.RectRange[0].X

        let CurPosY = Settings.RectRange[0].Y + Settings.RectMargin
        let CurID = 0

        for (let i = 0; i < Layers; i++){
            let CurPosX = Settings.RectMargin
            let LayerColour = ColourPalette[i]

            while (ValidWidth - CurPosX > Settings.RectMargin * 3 + Settings.RectMinLength * 2){
                let CurWidth = RandVal(
                    Settings.RectMinLength, 
                    Math.min(ValidWidth - CurPosX - Settings.RectMargin * 2 - Settings.RectMinLength, Settings.RectMinLength * 10)
                )

                Game.Sprites.push(
                    new RectSprite(
                        LayerColour,
                        CurPosX, CurPosY,
                        CurWidth, Settings.RectHeight
                    )
                )

                CurPosX += CurWidth + Settings.RectMargin
            }

            Game.Sprites.push(
                new RectSprite(
                    LayerColour,
                    CurPosX, CurPosY, 
                    ValidWidth - Settings.RectMargin - CurPosX, Settings.RectHeight,
                    CurID
                )
            )

            CurPosY += Settings.RectHeight + Settings.RectMargin
            CurID += 1
        }
    } else {
        // test blocks
        Game.Sprites.push(
            new RectSprite(
                "70ff00",
                Settings.RectRange[1].X / 4, Settings.RectRange[0].Y, 
                Settings.RectRange[1].X / 4 - Settings.RectMargin / 2, Settings.RectHeight * 10,
                1
            )
        )

        Game.Sprites.push(
            new RectSprite(
                "70ff00",
                Settings.RectRange[1].X / 2 + Settings.RectMargin / 2, Settings.RectRange[0].Y, 
                Settings.RectRange[1].X / 4, Settings.RectHeight * 10,
                2
            )
        )   
    }

    Game.ActiveSprites = Game.Sprites.length
}

function GameLoop(){
    window.requestAnimationFrame(GameLoop)

    Game.Frame += 1

    if (!Game.isPlaying) 
        return

    ToDestroy()
    UpdateSprites()

    if (Game.Frame < 50)
        Game.Ball.Blink()
    else if (Game.Frame == 50)
        Game.Ball.SetVelocity()
}

