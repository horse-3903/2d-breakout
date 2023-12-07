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

        if (this instanceof PlayerSprite){
            if (Keyboard.Left) this.Position.X -= Settings.PlayerSpeed
            if (Keyboard.Right) this.Position.X += Settings.PlayerSpeed

            if (this.Position.X < 0) this.Position.X = 0
            if (this.Position.X + this.Width > Canvas.width) {
                this.Position.X = Canvas.width - this.Width
            }
        }

        if (this instanceof BallSprite){
            if (this.Position.X - this.Radius <= 0 || this.Position.X + this.Radius >= Canvas.width) 
                this.Velocity = Pair(-this.Velocity.X, this.Velocity.Y)
            
            if (this.Position.Y - this.Radius <= 0) 
                this.Velocity = Pair(this.Velocity.X, -this.Velocity.Y)

            if (P1.Position.Y < this.Position.Y + this.Radius && P1.Position.X < this.Position.X && this.Position.X < P1.Position.X + P1.Width){
                this.Velocity = Pair(this.Velocity.X, -this.Velocity.Y)
                console.log("WHY")
            }
            
            if (this.Position.Y + this.Radius >= Canvas.height) {
                console.log("YOU FUCKING LOSE")
                // endgame phase
                SpawnSprites()
            }

            this.Position.X += this.Velocity.X
            this.Position.Y += this.Velocity.Y
        }

        if (this instanceof RectSprite){

        }
    }
}

class PlayerSprite extends Sprite{
    constructor(Colour, X, Y, Width, Height){
        super(Colour, X, Y, Width, Height)
        this.isMoving = false
    }
}

class BallSprite extends Sprite{
    constructor(Colour, X, Y, Radius){
        super(Colour, X, Y)
        this.Radius = Radius
        this.Velocity = Pair(0, 0)
    }

    SetVelocity(){
        this.Velocity = Pair(
            RandVal(-Settings.StartBallSpeed, Settings.StartBallSpeed), 
            RandVal(0.5, Settings.StartBallSpeed),
        )
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
}

class RectSprite extends Sprite{
    constructor(Colour, X, Y, Width, Height){
        super(Colour, X, Y, Width, Height)
        this.Active = true
    }
}

const P1 = new PlayerSprite("#1FEA00", 0, 0, 150, 15)
const B1 = new BallSprite("1FEA00", 0, 0, 7.5)