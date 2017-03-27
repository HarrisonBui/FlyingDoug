## Flying Doug
#### Background
Flying Doug is a clone of [Doodle Jump](https://en.wikipedia.org/wiki/Doodle_Jump) written in javascript using canvas.  Sprites are used for the game images.

The user will guide Doug the Pug's horizontal jump direction while Doug will jump upward by himself.  The user's score will continue to increase as long as Doug keeps jumping from platform to platform.  The game will conclude when Doug stops flying in the upward direction.

## Functionality & MVP
- Start and reset the game
- Use the left and right arrow keys to move Doug
- White platforms perform a normal jump while rainbow color platforms perform a super jump.
- Scoring
- Production README

## Design Docs
* [View Wireframes](docs/wireframes)

## Technologies
* Vanilla Javascript for overall structure and game logic.
* Canvas for DOM manipulation and rendering.
* Sprites
* Webpack to bundle and serve up the various scripts.

## Implementation Timeline
* Day 1: Outline a basic file structure and have front page instructions rendering.  Have sprites for platform object and Main character object rendering and movement logic.
* Day 2: Character able to jump on platforms and continue moving up.
* Day 3: Scoring is calculated by which platform is hit.  Implement enemy object that on hit will end the game.
