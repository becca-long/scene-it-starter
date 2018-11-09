document.addEventListener('DOMContentLoaded', init)

function init () {
    var watchlistJSON = localStorage.getItem('watchlist')
    var moviesList = document.getElementById('watchlist-movies-container')
    moviesList.innerhtml = renderWatchlistMovies(watchlistJSON)
}

function renderWatchlistMovies (movieArray) {
    console.log(movieArray)
    var watchlistMovieHTML = movieArray.map(function (currentMovie) {
        return `
        <div class="card text-center movie" style="width: 18rem; margin-top: 20px; margin-bottom: 20px;">
            <img class="card-img-top" src="${currentMovie.Poster}/100px180/" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title movie-title">${currentMovie.Title}</h5>
                <p class="card-text movie-year">${currentMovie.Year}</p>
                <a href="#" class="btn btn-primary" onclick="saveToWatchList('${currentMovie.imdbID}')">Add</a>
            </div>
        </div>
        `
    }).join('')

    return watchlistMovieHTML
}


// Write a watchlist.js file that does the following:
// When the page loads, pull the watchlist from localStorage
// Use localStorage.getItem(‘watchlist’);
// Renders each movie to “movies-container”, just like in index.js
// You can have the movies render exactly like they did in index.js, or you can switch it up!
// You’ll find that the above ^^ is almost identical to what you did in Part 1! The only difference is that instead of showing a list of movies from data.js,  you’ll be showing a list of movies from localStorage.getItem(‘watchlist’);
