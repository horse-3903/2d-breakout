const Settings = {
    // Ball Settings
    StartBallSpeed : 5,
    MinBallSpeed : 0.75,
    MaxBallSpeed : 10,
    AccelerationCoefficient : 1.2,
    FrictionCoefficient : 0.8,

    // Player Settings
    PlayerSpeed : 12,

    // Rectangle Settings
    RectMargin : 5,
    RectMinLength : 40,
    RectHeight : 20,
    RectRange : [Pair(0, 0), Pair(0, 0)],
}

const Game = {
    Player : null,
    Ball : null,
    Sprites : [],
    ActiveSprites : 0,
    
    Score : 0,
    isPlaying : false,

    Frame : 0,
}

const Keyboard = {
    Left : false,
    Right : false,
    SavedLeft : false,
    SavedRight : false,
}