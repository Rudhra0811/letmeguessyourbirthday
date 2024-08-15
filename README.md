# letmeguessyourbirthday

Birthday Guesser is an interactive web application that attempts to guess a user's birthday (or birth month/season) through a series of questions. It uses a binary search algorithm to efficiently narrow down the possible dates.

## Features

- Three difficulty levels:
  - Guess Exact Date
  - Guess Month
  - Guess Season
- Interactive UI with buttons for user input
- Progress bar to show how close the game is to completion
- Visual calendar representation of the remaining possible dates
- Sound effects for interactions and winning
- Responsive design for various screen sizes

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

## Setup and Installation

1. Clone the repository or download the source code.
2. this is the link `https://github.com/Rudhra0811/letmeguessyourbirthday`
3. Ensure you have the following files in your project directory:
   - `index.html`
   - `style.css`
   - `script.js`
4. (Optional) Replace the placeholder sound effect URLs in `script.js` with your own sound files:
   - `https://example.com/win.mp3`
   - `https://example.com/click.mp3`

## How to Run

Open the `index.html` file in a web browser. No server is required as this is a client-side application.

## How to Play

1. Select a difficulty level from the dropdown menu.
2. Think of your birthday (or birth month/season, depending on the selected difficulty).
3. Answer the questions by clicking the appropriate button:
   - "Before" if your birthday is before the displayed date
   - "On" if your birthday is on the displayed date
   - "After" if your birthday is after the displayed date
4. Continue answering questions until the game guesses your birthday or gives up.
5. Click "Play Again" to start a new game.

## Customization

You can easily customize the appearance of the game by modifying the `style.css` file. The color scheme, fonts, and layout can all be adjusted to fit your preferences.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Improvements

- Add more difficulty levels or game modes
- Implement localization for multiple languages
- Add animations for a more engaging user experience
- Create a backend to store statistics and high scores
