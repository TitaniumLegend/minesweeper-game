# Minesweeper Game

## Overview
This is a simple implementation of the classic Minesweeper game. The objective of the game is to clear a grid of hidden mines without detonating any of them. The player can reveal cells or place flags to indicate where they believe mines are located.

## Project Structure
```
minesweeper-game
├── public
│   ├── index.html       # HTML structure of the game
│   ├── style.css       # CSS styles for the game
│   └── script.js       # JavaScript code for game logic
├── README.md           # Documentation for the project
```

## Getting Started

### Prerequisites
- A web browser to run the game.

### Installation
1. Clone the repository to your local machine:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd minesweeper-game
   ```

### Running the Game
1. Open the `public/index.html` file in your web browser.
2. Adjust the number of mines using the input field and click "Start Game" to begin.
3. Click on the cells to reveal them. Use the toggle button to switch between opening cells and placing flags.

## How to Play
- Click on a cell to reveal it. If it contains a mine, the game is over.
- If a cell is revealed and it shows a number, it indicates how many mines are adjacent to that cell.
- Use flags to mark cells where you suspect mines are located.

## Contributing
Feel free to submit issues or pull requests if you have suggestions for improvements or new features.

## License
This project is open-source and available under the MIT License.