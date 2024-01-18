class Sprite{
    constructor(Colour, X, Y, Width, Height){
        this.Colour = Colour
        this.Position = Pair(X, Y)
        ;[this.Width, this.Height] = [Width, Height];
    }

    Center(X, Y){
        this.Position = Pair(X - ~~(this.Width/2), Y - ~~(this.Height/2))
    }

    Render(){
        Context.fillRect(
            ...Object.values(this.Position), 
            this.Width, 
            this.Height) 
    }

    Update(){
        Context.fillStyle = this.Colour
        this.Render()   
    }
}

class PlayerSprite extends Sprite{
    constructor(Colour, X, Y, Width, Height){
        super(Colour, X, Y, Width, Height)
        this.Moving = false
        this.Computer = false
    }

    Update(){
        super.Update()
        if (Keyboard.Left) 
            this.Position.X -= Settings.PlayerSpeed

        if (Keyboard.Right) 
            this.Position.X += Settings.PlayerSpeed
        
        if (Keyboard.Left || Keyboard.Right) 
            this.Moving = true

        if (this.Computer){
            this.Center(Game.Ball.Position.X, this.Position.Y + ~~(this.Height / 2))
            this.Moving = true
        }

        if (this.Position.X < 0){
            this.Position.X = 0
            this.Moving = false
        }

        if (this.Position.X + this.Width > Canvas.width){ 
            this.Position.X = Canvas.width - this.Width
            this.Moving = false
        }
    }
}

class BallSprite extends Sprite{
    constructor(Colour, X, Y, Radius){
        super(Colour, X, Y)
        this.SavedColour = Colour
        this.Radius = Radius
        this.Angle = 0
        this.Velocity = Pair(0, 0)
    }

    SetVelocity(){
        this.Colour = this.SavedColour

        this.Velocity = Pair(
            // RandVal(-Settings.StartBallSpeed, Settings.StartBallSpeed, (i) => Math.abs(i) > 1.25), 
            // RandVal(1.5, Settings.StartBallSpeed),
            60, 25
            // 0, 10
        )
    }

    Blink(){
        if ((0 <= Game.Frame && Game.Frame <= 10) || (21 <= Game.Frame && Game.Frame <= 30) || (41 <= Game.Frame && Game.Frame <= 50))
            this.Colour = "white"
        else if ((11 <= Game.Frame && Game.Frame <= 20) || (31 <= Game.Frame && Game.Frame <= 40) || (Game.Frame > 50))
            this.Colour = this.SavedColour
    }

    Center(X, Y){
        this.Position = Pair(X, Y)
    }
    
    Render(){
        Context.beginPath()
        Context.arc(
            ...Object.values(this.Position), 
            this.Radius, 
            0, Math.PI * 2)
        Context.fill()
        Context.closePath()
    }

    Update(){
        super.Update()
        if (
            (this.Position.X - this.Radius <= 0) || 
            (this.Position.X + this.Radius >= Canvas.width)
        )
            this.Velocity = Pair(-this.Velocity.X, this.Velocity.Y)
        
        if (this.Position.Y - this.Radius <= 0) 
            this.Velocity = Pair(this.Velocity.X, -this.Velocity.Y)
        
        if (
            (Game.Player.Position.X <= this.Position.X - this.Radius) && 
            (Game.Player.Position.X + Game.Player.Width >= this.Position.X + this.Radius) &&
            (Game.Player.Position.Y <= this.Position.Y + this.Radius) && 
            (Game.Player.Position.Y >= this.Position.Y)
        ){
            if (!Game.Player.Moving)
                this.Velocity = Pair(this.Velocity.X, this.Velocity.Y)
            
            else if (Keyboard.Left){
                if (this.Velocity.X > 0)
                    this.Velocity = Pair(Math.max(this.Velocity.X * Settings.FrictionCoefficient, Settings.MinBallSpeed), this.Velocity.Y)
                
                else if (this.Velocity.X < 0)
                    this.Velocity = Pair(Math.max(this.Velocity.X * Settings.AccelerationCoefficient, -Settings.MaxBallSpeed), this.Velocity.Y)
            } 
            
            else if (Keyboard.Right){
                if (this.Velocity.X > 0)
                    this.Velocity = Pair(Math.min(this.Velocity.X * Settings.AccelerationCoefficient, Settings.MaxBallSpeed), this.Velocity.Y)
                    
                else if (this.Velocity.X < 0)
                    this.Velocity = Pair(Math.min(this.Velocity.X * Settings.FrictionCoefficient, -Settings.MinBallSpeed), this.Velocity.Y)                }

            this.Velocity = Pair(this.Velocity.X, -Math.abs(this.Velocity.Y))
        }
        
        if (this.Position.Y + this.Radius >= Canvas.height) {
            console.log("YOU LOSE")
            
            SetScreen()
        } else if (!Game.ActiveSprites) {
            console.log("YOU WIN")

            SetScreen()
        }        

        this.Position.X += ~~(this.Velocity.X)
        this.Position.Y += ~~(this.Velocity.Y)
    }
}

class RectSprite extends Sprite{
    constructor(Colour, X, Y, Width, Height, id){
        super(Colour, X, Y, Width, Height)
        this.Active = true
        this.Destroy = false
        this.id = id
    }

    Update(){
        if (this.Active){
            super.Update()
        
            if (
                (Game.Ball.Position.X + Game.Ball.Radius >= this.Position.X - Settings.RectMargin / 2) && 
                (Game.Ball.Position.X - Game.Ball.Radius <= this.Position.X + this.Width + Settings.RectMargin / 2) &&
                (Game.Ball.Position.Y + Game.Ball.Radius >= this.Position.Y - Settings.RectMargin / 2) &&
                (Game.Ball.Position.Y - Game.Ball.Radius <= this.Position.Y + this.Height + Settings.RectMargin / 2)
            ){
                if (
                    Math.min(
                        Math.abs(Game.Ball.Position.Y - this.Position.Y), 
                        Math.abs(Game.Ball.Position.Y - this.Position.Y - this.Height)
                    ) < 
                    Math.min(
                        Math.abs(Game.Ball.Position.X - this.Position.X), 
                        Math.abs(Game.Ball.Position.X - this.Position.X - this.Width)
                    )
                ){
                    if (Math.abs(Game.Ball.Position.Y - this.Position.Y) > Math.abs(Game.Ball.Position.Y - this.Position.Y - this.Height))
                        Game.Ball.Velocity = Pair(Game.Ball.Velocity.X, Math.abs(Game.Ball.Velocity.Y))
                    else
                        Game.Ball.Velocity = Pair(Game.Ball.Velocity.X, -Math.abs(Game.Ball.Velocity.Y))
                } else {
                    if (Math.abs(Game.Ball.Position.X - this.Position.X) > Math.abs(Game.Ball.Position.X - this.Position.X - this.Width))
                        Game.Ball.Velocity = Pair(Math.abs(Game.Ball.Velocity.X), Game.Ball.Velocity.Y)                        
                    else
                        Game.Ball.Velocity = Pair(-Math.abs(Game.Ball.Velocity.X), Game.Ball.Velocity.Y)
                }

                this.Destroy = true
                
                UpdateScore(Game.Score + 1)
            }
        }
    }
}