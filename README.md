# 2D Breakout Game

## Overview

2D Breakout is a classic arcade game implemented in JavaScript for 2D game development practice. The game is inspired by Atari Breakout and involves controlling a paddle to bounce a ball against a wall of bricks. The objective is to break all the bricks with the bouncing ball without letting it fall off the screen.

This project was created as part of a learning journey into 2D game development using JavaScript.

## Preview

![Game Preview](https://raw.githubusercontent.com/horse-3903/2d-breakout/main/preview/preview_1.png)

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/2d-breakout.git`
2. Open `index.html` in a web browser to start the game.

## Game Controls

- **Left Arrow / 'A' Key**: Move the paddle to the left.
- **Right Arrow / 'D' Key**: Move the paddle to the right.

## Features

### Paddle and Ball
- **Paddle Movement**: Use the left and right arrow keys to move the paddle.
- **Ball Bouncing**: The ball bounces off the walls and paddle.
- **Ball Velocity**: The ball starts with a random velocity, adding an element of unpredictability.

### Bricks
- **Brick Field**: The game features a wall of bricks at the top.
- **Breakable Bricks**: Bricks can be destroyed by hitting them with the ball.
- **Immunity Mechanism**: Some bricks have immunity and turn red when hit, becoming vulnerable after a certain period.

### Scoring
- **Score Display**: The score is displayed on the screen.
- **Score Update**: The score increases each time a brick is destroyed.
- **Win/Lose Condition**: The game ends with a win if all bricks are destroyed or a loss if the ball falls off the screen.

### Game Modes
- **Computer Mode**: The paddle automatically follows the ball for an additional challenge.
- **Test Mode**: Includes test blocks for debugging purposes.

## Code Structure

- **init.js**: Initializes the game canvas, sets up event listeners, and starts the game loop.
- **main.js**: Defines player and ball objects, handles keyboard input, and updates the game loop.
- **sprites.js**: Contains classes for game sprites (Player, Ball, Rect) with their respective update methods.
- **config.js**: Holds game settings and configuration parameters.
- **util.js**: Contains utility functions like Pair for managing X and Y coordinates and RandVal for generating random values within a range.

## Configurations

Adjust game settings in `config.js` to customize aspects such as ball speed, player speed, and rectangle dimensions.

## Future Enhancements

- Add proper GUI
- Add levels with increasing difficulty.
- Implement power-ups and special bricks.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to contribute or use this code as a starting point for your own game development projects!