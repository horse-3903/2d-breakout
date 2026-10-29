<div align="center">

# 2D Breakout

A classic Breakout arcade game built with HTML5 Canvas and vanilla JavaScript

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/github/license/horse-3903/2d-breakout?style=flat-square)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/horse-3903/2d-breakout?style=flat-square)](../../commits)

</div>

---

## Overview

2D Breakout is a browser-based implementation of the classic Atari Breakout arcade game, built using HTML5 Canvas and vanilla JavaScript. Control a paddle to bounce a ball and destroy all the bricks. The game features physics-based ball dynamics, immune bricks, a computer-controlled paddle mode, and configurable settings, making it both a playable game and a practical study in 2D game development.

## Preview

![Game Preview](https://raw.githubusercontent.com/horse-3903/2d-breakout/main/preview/preview_1.png)

## Features

- **Physics-based ball movement**: ball launches with a randomised initial velocity for unpredictability
- **Paddle momentum**: ball speed increases or decreases based on paddle movement direction at impact
- **Immune bricks**: some bricks flash red when first hit and become destructible only after a cooldown period
- **Scoring system**: score increments with each brick destroyed, displayed live on screen
- **Computer mode**: the paddle automatically tracks the ball, useful for watching the game play itself
- **Win / lose conditions**: win by clearing all bricks; lose if the ball falls below the paddle
- **Configurable settings**: adjust ball speed, paddle speed, brick dimensions, and more via `config.js`

## Tech Stack

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5%20Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- No build tools, server, or dependencies required

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/horse-3903/2d-breakout.git
   cd 2d-breakout
   ```

2. Open the game in your browser:
   ```bash
   # Simply open the file directly
   open src/index.html       # macOS
   start src/index.html      # Windows
   xdg-open src/index.html   # Linux
   ```

   Or drag `src/index.html` into any web browser window.

### Controls

| Key | Action |
|-----|--------|
| Left Arrow / `A` | Move paddle left |
| Right Arrow / `D` | Move paddle right |

### Configuration

Open `src/scripts/config.js` to adjust gameplay parameters:

| Setting | Description |
|---------|-------------|
| Ball speed | Initial speed of the ball |
| Player speed | Paddle movement speed |
| Brick dimensions | Width, height, and gap of the brick grid |

## Project Structure

```
2d-breakout/
├── src/
│   ├── index.html          # Game entry point — open this in a browser
│   ├── styles.css          # Game styling
│   └── scripts/
│       ├── init.js         # Canvas setup, event listeners, game loop start
│       ├── main.js         # Player and ball objects, keyboard input, game loop
│       ├── sprites.js      # Sprite classes: Player, Ball, Rect
│       ├── config.js       # Game settings and configuration
│       └── util.js         # Utility classes: Pair (x/y coords), RandVal (random ranges)
└── preview/
    └── preview_1.png       # Screenshot preview
```

## License

This project is licensed under the [MIT License](LICENSE).
