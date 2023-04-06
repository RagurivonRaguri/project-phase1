document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('Successfully loaded!');
}

fetch('http://localhost:3000/games')
    .then(res => res.json())
    .then(data => createCard(data));

function createCard(games) {
    const gameContainer = document.querySelector('#game-container');

    games.forEach(game => {
        const card = document.createElement('li');
        card.setAttribute('id', 'card');
        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${game.image_url}" class="card-img-top" alt="${game.id}">
                <div class="card-body">
                    <h2 class="card-title">${game.name}</h2>
                    <p class="card-text">Genre:${game.genres}</p>
                    <p class="card-text">Platforms:${game.platforms}</p>
                    <p class="card-text">Release Date:${game.release_date}</p>
                    <button id="like-button">❤️: <span id="likes-count">${game.likes}</span></button>
                    <button id="dislike-button">👎: <span id="dislikes-count">${game.dislikes}</span></button>
                    <button id="buyButton" class="button">BUY GAME</button>
                    </div>
                </div>
                `;
    

                
        const like = card.querySelector('#like-button');
        like.addEventListener('click', likeGame);

        function likeGame() {
            const likeHeart = like.innerHTML = `❤️`;
            
            fetch(`http://localhost:3000/games/${game.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ likes: game.likes + 1 })
            })
            .then(res => res.json())
            .then(data => {
              game.likes = data.likes;
              likesCount.textContent = game.likes;
            });
              
              card.append(likeHeart);
              
            }
        const dislike = card.querySelector('#dislike-button');
        dislike.addEventListener('click', dislikeGame);
        
        function dislikeGame() {
            const dislikeHeart = dislike.innerHTML = `👎`;
            
            fetch(`http://localhost:3000/games/${game.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ dislikes: game.dislikes + 1 })
            })
            .then(res => res.json())
            .then(data => {
                game.dislikes = data.dislikes;
                dislikesCount.textContent = game.dislikes;
            });

            card.append(dislikeHeart);

        }
        
        gameContainer.appendChild(card);
        const buy = card.querySelector('#buyButton');
        buy.addEventListener('click', e => {
            e.preventDefault();
            const listOfBoughtGames = document.querySelector('#boughtGames');
            const gameId = game.id;
            let gameDiv;
        
            const existingGameDiv = document.querySelector(`#game-${gameId}`);
            if (existingGameDiv) {
                // If the game already exists, update the "Times Bought" value
                const timesBoughtSpan = existingGameDiv.querySelector(`#times-bought-${gameId}`);
                const timesBought = Number(timesBoughtSpan.innerText) + 1;
                timesBoughtSpan.innerText = timesBought;
            } else {
                // If the game doesn't exist, create a new entry
                gameDiv = document.createElement('div');
                gameDiv.classList.add('card');
                gameDiv.style.width = '18rem';
                gameDiv.id = `game-${gameId}`;
                gameDiv.innerHTML = `
                    <img src="${game.image_url}" class="card-img-top" alt="${game.id}">
                    <div class="card-body">
                        <h2 class="card-title">${game.name}</h2>
                        <p class="card-text">Genre:${game.genres}</p>
                        <p class="card-text">Platforms:${game.platforms}</p>
                        <p class="card-text">Release Date:${game.release_date}</p>
                        <p class="card-text">Times Bought: <span id="times-bought-${gameId}">1</span></p>
                        <button id="reset" class="button">Remove Game</button>
                    </div>`;
                listOfBoughtGames.appendChild(gameDiv);
        
                fetch(`http://localhost:3000/user_games`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(game) 
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                
            }
            
            const removeGame = (gameDiv) => {
                listOfBoughtGames.removeChild(gameDiv);
            }
            
            gameDiv.querySelector('#reset').addEventListener('click', () => {
                removeGame(gameDiv);
            });
        });
        
});
   function createGame(event) {
  event.preventDefault();
  const gameName = document.querySelector('#gameName').value;
  const gameGenre = document.querySelector('#gameGenre').value;
  const gameUrl = document.querySelector('#gameUrl').value;
  const gamePlatforms = document.querySelector('#gamePlatforms').value;

  // Check if game with same name already exists
  fetch(`http://localhost:3000/games?name=${gameName}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        alert('Game already exists');
      } else {
        // Create new game
        const game = {
          name: gameName,
          genres: gameGenre,
          image_url: gameUrl,
          platforms: gamePlatforms,
          release_date: "10/2/2020"
        };
        fetch(`http://localhost:3000/games`, {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(game)
        })
        .then(res => res.json())
        .then(() => {
          document.querySelector('#addGame').reset(); // Reset form
          // Remove all existing cards
          const cards = document.querySelectorAll('.card');
          cards.forEach(card => card.remove());
          // Retrieve games data and create new cards
          fetch('http://localhost:3000/games')
            .then(res => res.json())
            .then(data => createCard(data));
        });
      }
    });
}

addGame.addEventListener('submit', createGame);


const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-container');

function searchGames(event) {
  event.preventDefault();
  //First clear the container to prevent duplication of games
  searchResults.innerHTML = '';

  //Making the input to be in lower case helps in comparison of the game names
  const searchTerm = searchInput.value.toLowerCase();

  fetch('http://localhost:3000/games')
    .then(response => response.json())
    .then(games => {
      
      const matchingGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm)
      );
      const searchResultItems = matchingGames.map(game =>
        card.innerHTML=`
        <div class="card" style="width: 18rem;">
    <img src="${game.image_url}" class="card-img-top" alt="${game.id}">
    <div class="card-body">
        <h2 class="card-title">${game.name}</h2>
        <p class="card-text">Genre:${game.genres}</p>
        <p class="card-text">Platforms:${game.platforms}</p>
        <p class="card-text">Release Date:${game.release_date}</p>
        <p class="card-text">In stock: ${game.InStock}</p>
        <button id="like-button">❤️: <span id="likes-count">${game.likes}</span></button>
        <button id="dislike-button">👎: <span id="dislikes-count">${game.dislikes}</span></button>
        <button class="button">BUY GAME</button>
        </div>
        </div> `
      );
      searchResults.innerHTML = searchResultItems.join('');
      //This brings all the result items together in one card
    });
}
const searchForm = document.querySelector('#searchbar');
searchForm.addEventListener('submit', searchGames);

    }
