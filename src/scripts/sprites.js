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
            if (Keyboard.Left) 
                this.Position.X -= Settings.PlayerSpeed
            if (Keyboard.Right) 
                this.Position.X += Settings.PlayerSpeed
            
            if (Keyboard.Left || Keyboard.Right) 
                this.Moving = true
            else
                this.Moving = false

            if (this.Position.X < 0){
                this.Position.X = 0
                this.Moving = false
            }

            if (this.Position.X + this.Width > Canvas.width){ 
                this.Position.X = Canvas.width - this.Width
                this.Moving = false
            }
        }

        if (this instanceof BallSprite){
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
                    this.Velocity = Pair(this.Velocity.X, -this.Velocity.Y)
                
                else if (Keyboard.Left){
                    if (this.Velocity.X > 0)
                        this.Velocity = Pair(Math.max(this.Velocity.X * Settings.FrictionCoefficient, Settings.MinBallSpeed), -this.Velocity.Y)
                    
                    else if (this.Velocity.X < 0)
                        this.Velocity = Pair(Math.max(this.Velocity.X * Settings.AccelerationCoefficient, -Settings.MaxBallSpeed), -this.Velocity.Y)
                } 
                
                else if (Keyboard.Right){
                    if (this.Velocity.X > 0)
                        this.Velocity = Pair(Math.min(this.Velocity.X * Settings.AccelerationCoefficient, Settings.MaxBallSpeed), -this.Velocity.Y)
                        
                    else if (this.Velocity.X < 0)
                        this.Velocity = Pair(Math.min(this.Velocity.X * Settings.FrictionCoefficient, -Settings.MinBallSpeed), -this.Velocity.Y)                }
            }
            
            if (this.Position.Y + this.Radius >= Canvas.height) {
                console.log("YOU FUCKING LOSE")
                // endgame phase
                SpawnSprites()
            }

            console.log(this.Velocity)

            this.Position.X += ~~(this.Velocity.X)
            this.Position.Y += ~~(this.Velocity.Y)
        }

        if (this instanceof RectSprite){

        }
    }
}

class PlayerSprite extends Sprite{
    constructor(Colour, X, Y, Width, Height){
        super(Colour, X, Y, Width, Height)
        this.Moving = false
    }
}

class BallSprite extends Sprite{
    constructor(Colour, X, Y, Radius){
        super(Colour, X, Y)
        this.Radius = Radius
        this.Angle = 0
        this.Velocity = Pair(0, 0)
    }

    SetVelocity(){
        this.Velocity = Pair(
            RandVal(-Settings.StartBallSpeed, Settings.StartBallSpeed, (i) => Math.abs(i) > 1), 
            RandVal(1, Settings.StartBallSpeed),
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
    }
}

const P1 = new PlayerSprite("#1FEA00", 0, 0, 150, 15)
const B1 = new BallSprite("1FEA00", 0, 0, 7)