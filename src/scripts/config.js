const Settings = {
    StartBallSpeed : 5,
    MinBallSpeed : 0.75,
    MaxBallSpeed : 10,
    AccelerationCoefficient : 1.3,
    FrictionCoefficient : 0.7,
    PlayerSpeed : 12,
}

const Game = {
    Player : null,
    Ball : null,
    Sprites : [],
    Score : 0,
    isPlaying : false,
}

const Keyboard = {
    Left : false,
    Right : false,
}