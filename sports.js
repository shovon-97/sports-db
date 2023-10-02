const searchPlayer = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    if(searchText === '') {
        // please write something to display

        alert('Please enter a player name to search.');
    }
    else {
        const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchText}`;

    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.player));
    }

}

const displaySearchResult = player => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(player.length === 0){
        const noResultMessage = document.createElement('p');
        noResultMessage.textContent = 'No results found.';
        searchResult.appendChild(noResultMessage);
    } 
    else {
        player.forEach(player => {
            // console.log(player);
            const div = document.createElement ('div');
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
        })
    }
};
    
const loadPlayerDetail = idPlayer => {
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${idPlayer}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlayerDetail(data.players[0]));
}

const displayPlayerDetail = player => {
    console.log(player);
    const playerDetails = document.getElementById('player-details')
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
}