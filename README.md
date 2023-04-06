# project-phase1

# RAGURI'S GAMER SHOP

This code is designed to display game cards in a game container from the data obtained from a local server. Each card contains information about the game, such as its name, genres, platforms, release date, number of likes and dislikes, and an option to buy the game. Users can also like, dislike and buy games. Additionally, there is a form for creating a new game.

The init() function is executed when the DOM content is loaded. It logs a message to the console indicating that the page has successfully loaded.

The fetch() function is used to retrieve game data from the server at the address http://localhost:3000/games. The res.json() method is used to convert the response data into JSON format, and then the createCard() function is called with the JSON data as its argument.

The createCard() function creates a card for each game in the received data and appends it to the game container. The querySelector() method is used to select the game-container element, and a loop is used to create a card for each game. The card is created using document.createElement('li'), and its id attribute is set to card. The game's details are then added to the card using innerHTML. The likeGame() and dislikeGame() functions are called when the like and dislike buttons are clicked, respectively. These functions use the fetch() function to update the server with the new like/dislike count for the game, and then update the likesCount or dislikesCount span elements accordingly.

The buy button is used to buy a game. When this button is clicked, an event listener is triggered that adds the selected game to a new container called boughtGames. If the game already exists in the boughtGames container, the number of times it has been bought is increased, and if it doesn't exist, a new entry is created for it. The fetch() function is also used to update the server with the newly purchased game.

Finally, there is a createGame() function that is called when the form for creating a new game is submitted. The function checks if a game with the same name already exists in the server's database and if not, creates a new game with the provided information using the fetch() function.

# Author: Lincoln Muraguri
# License: [year:2023] [Authors-initials: L.M.M]