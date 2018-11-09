document.addEventListener('DOMContentLoaded', init)

function init () {
    document.getElementById('search-form').addEventListener('submit', searchMovies)
}

function saveToWatchList (imdbID) {
    console.log('you want to add to the watch list')
    var movie = movieData.find(function (currentMovie) {
        return currentMovie.imdbID == imdbID
    })

    var watchlistJSON = localStorage.getItem('watchlist')

    var watchlist = JSON.parse(watchlistJSON)

    if (watchlist == null) {
        watchlist = []
    }

    watchlist.push(movie)

    watchlistJSON = JSON.stringify(watchlist)

    localStorage.setItem('watchlist', watchlistJSON)
}

function searchMovies (evt) {
    evt.preventDefault()
    var searchString = document.getElementById('search-bar').value
    var urlEncodedSearchString = encodeURIComponent(searchString)
    axios.get("http://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString).then(function(response) {
        console.log(response.data)
        document.getElementById('movies-container').innerHTML = renderMovies(response.data.Search)
    })
}

function renderMovies (movieArray) {
    console.log(movieArray)
        var movieHTML = movieArray.map(function (currentMovie) {
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

        return movieHTML
    }




    // function renderMovie (currentMovie) {
    //     return `
    //         <div class="card text-center movie" style="width: 18rem;">
    //             <img class="card-img-top" src="${currentMovie.Poster}/100px180/" alt="Card image cap">
    //             <div class="card-body">
    //                 <h5 class="card-title movie-title">${currentMovie.Title}</h5>
    //                 <p class="card-text movie-year">${currentMovie.Year}</p>
    //                 <a href="#" class="btn btn-primary">Add</a>
    //             </div>
    //         </div>
    //         `
    // }

    // function renderMovies (allMovies) {
    //     return allMovies.map(renderMovie).join('')
    // }
