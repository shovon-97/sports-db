// Function to search for a player
const searchPlayer = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const loadingSpinner = document.getElementById('loading-spinner');
    const searchResult = document.getElementById('search-result');
    
    // Clear previous search results
    searchResult.textContent = '';

    if (searchText === '') {
        alert('Please enter a player name to search.');
    } else {
        loadingSpinner.style.display = 'block';

        // API URL for searching players
        const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                displaySearchResult(data.player);
                loadingSpinner.style.display = 'none';
            })
            .catch(error => {
                console.error('Error:', error);
                loadingSpinner.style.display = 'none';
            });
    }
};

// Function to display search results
const displaySearchResult = players => {
    const searchResult = document.getElementById('search-result');

    if (players === null) {
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = 'No results found.';
        searchResult.appendChild(noResultMessage);
    } else {
        players.forEach(player => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div onclick="loadPlayerDetail(${player.idPlayer})" class="card h-100">
                    <img src="${player.strThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${player.strPlayer}</h5>
                        <p class="card-text">${player.strDescriptionEN.slice(0, 150)}</p>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        });
    }
};

// Function to load player details
const loadPlayerDetail = idPlayer => {
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = 'block';

    // API URL for fetching player details
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${idPlayer}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayPlayerDetail(data.players[0]);
            loadingSpinner.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            loadingSpinner.style.display = 'none';
        });
};

// Function to display player details
const displayPlayerDetail = player => {
    const playerDetails = document.getElementById('player-details');
    playerDetails.textContent = '';

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${player.strThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${player.strPlayer}</h5>
            <p class="card-text">${player.strDescriptionEN.slice(0, 150)}</p>
            <a href="${player.strFacebook}" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    playerDetails.appendChild(div);
};

// Add an event listener for the search button
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', searchPlayer);
