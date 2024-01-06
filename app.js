// const defined
const movieContainer = document.getElementById('Cards');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');

// Fetching from here
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmFjMDczZmM2NGZhZGE5YTMxNTU1MzlkNWYzMGViZCIsInN1YiI6IjY1OTc3Yzc4NTkwN2RlNTQ2ZTYzYzA3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UicVG0R1cpvWhApW9lCa5MASIhIm99FNmHtVGJ6mIjU'
    }
};

// Function to fetch configuration data
function fetchConfiguration() {
    return fetch('https://api.themoviedb.org/3/configuration', options)
        .then(response => response.json())
        .then(data => data.images)
        .catch(error => {
            console.error('Error fetching configuration:', error);
            throw error;
        });
}

// Function to fetch top-rated movies data
function fetchTopRatedMovies() {
    return fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => {
            console.error('Error fetching top-rated movies:', error);
            throw error;
        });
}

// Function to combine data and create URLs
function combineDataAndCreateUrls() {
    return Promise.all([fetchConfiguration(), fetchTopRatedMovies()])
        .then(([cardImage, cardInfo]) => {
            const base = cardImage.secure_base_url;
            const posterSize = cardImage.poster_sizes[2];

            // Select the container with the ID 'card'
            let movieContainer = document.getElementById('Cards');

            if (!movieContainer) {
                console.error('Element with ID "Cards" not found.');
                return;
            }

            cardInfo.forEach(movie => {
                let title = movie.title;
                let rating = movie.vote_average;
                let overview = movie.overview;
                let release = movie.release_date;
                let poster = movie.poster_path;

                // Create URL using the combined data
                let imageUrl = `${base}${posterSize}${poster}`;

                // Create HTML for the movie card
                let cardHTML = `
                    <div class="card">
                        <img src="${imageUrl}" alt="${title}" class="card-image">
                        <div class="card-details">
                            <h2 class="card-title">${title}</h2>
                            <p class="card-release">Release Date: ${release}</p>
                            <p class="card-rating">Rating: ${rating}</p>
                            <p class="card-overview">${overview}</p>
                        </div>
                    </div>
                `;

                // Append the card HTML to the movie container
                movieContainer.innerHTML += cardHTML;
            });
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

// Call the combined function
combineDataAndCreateUrls();

