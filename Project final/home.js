

//  Replace with your Simkl API client ID
const CLIENT_ID = 'a0c77ae72ca4ed2c4e25d3d5137baaf718bb31497722e9e9718f4d46a856e7dd';
const trendingMoviesSection = document.querySelector('#trending-movies .carousel');
const trendingTVSection = document.querySelector('#trending-tv .carousel');
const modal = document.getElementById('movie-details');

//  Set to track added IDs to avoid duplicates
const movieIds = new Set();
const tvIds = new Set();

//  Loading Spinner
const createSpinner = () => {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.innerHTML = `
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    `;
    return spinner;
};

//  Helper function to construct image URL
function getImageUrl(posterPath) {
    if (!posterPath) return 'https://via.placeholder.com/200x300?text=No+Image';
    return `https://simkl.in/fanart/${posterPath}_w.jpg`;
}

//  Render a Movie/TV Card
function renderCard(container, show, type) {
    const idSet = type === 'movie' ? movieIds : tvIds;

    //  Avoid duplicate entries
    if (idSet.has(show.ids.simkl_id)) {
        console.log(`Duplicate avoided: ${show.title}`);
        return;
    }

    
    idSet.add(show.ids.simkl_id);

    
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', show.ids.simkl_id);

    const img = document.createElement('img');
    img.src = getImageUrl(show.poster);
    img.alt = show.title || "No Title";

    const title = document.createElement('p');

    //  Check if the year exists, otherwise extract it from 'date'
    const releaseYear = show.year || (show.date ? new Date(show.date).getFullYear() : null);
    title.textContent = releaseYear ? `${show.title} (${releaseYear})` : show.title;

    card.appendChild(img);
    card.appendChild(title);

    // Click Event to Show Details
    card.addEventListener('click', () => showDetails(show.ids.simkl_id, type));

    
    container.appendChild(card);
}

//  Fetch Trending Movies
async function fetchTrendingMovies() {
    const spinner = createSpinner();
    trendingMoviesSection.appendChild(spinner);

    try {
        const response = await fetch(`https://api.simkl.com/movies/trending?extended=overview,theater,metadata,tmdb,genres&client_id=${CLIENT_ID}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const movies = await response.json();
        trendingMoviesSection.innerHTML = '';  
        movieIds.clear();                      
        movies.forEach(movie => renderCard(trendingMoviesSection, movie, 'movie'));
    } catch (error) {
        console.error("Failed to load trending movies:", error);
    } finally {
        spinner.remove();
    }
}

//  Fetch Trending TV Shows
async function fetchTrendingTV() {
    const spinner = createSpinner();
    trendingTVSection.appendChild(spinner);

    try {
        const response = await fetch(`https://api.simkl.com/tv/trending?extended=overview,metadata,tmdb,genres&client_id=${CLIENT_ID}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const shows = await response.json();
        trendingTVSection.innerHTML = ''; 
        tvIds.clear();                     
        shows.forEach(show => renderCard(trendingTVSection, show, 'tv'));
    } catch (error) {
        console.error("Failed to load trending TV shows:", error);
    } finally {
        spinner.remove();
    }
}

// Function to Show Details in Modal
async function showDetails(id, type) {
    modal.classList.remove('hidden');
    modal.style.display = "block";
    modal.style.opacity = 0;
    setTimeout(() => modal.style.opacity = 1, 100); // Smooth fade-in

    const endpoint = type === 'movie' 
        ? `https://api.simkl.com/movies/${id}?extended=full&client_id=${CLIENT_ID}`
        : `https://api.simkl.com/tv/${id}?extended=full&client_id=${CLIENT_ID}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();

        //  Fill Modal Content
        document.getElementById('posterImage').src = getImageUrl(data.poster);
        document.getElementById('title').innerText = data.title || "Title Not Available";
        document.getElementById('plot').innerText = data.overview || "Plot not available.";
        document.getElementById('genre').innerText = data.genres ? data.genres.join(", ") : "Genre not available.";
        document.getElementById('rating').innerText = data.ratings.imdb?.rating || "N/A";
        document.getElementById('duration').innerText = data.runtime ? `${data.runtime} mins` : "Duration not available.";
        document.getElementById('network').innerText = data.network || "N/A";

    } catch (error) {
        console.error("Failed to load details:", error);
    }
}

//  Close the Modal
function closeDetails() {
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.add('hidden');
    }, 300);
}

// Search Bar Logic
async function handleSearch() {
    const query = document.getElementById('searchQuery').value.trim();
    const searchType = document.getElementById('searchType').value;

    if (query.length === 0) {
        alert("Please enter a search term.");
        return;
    }

    try {
        const response = await fetch(`https://api.simkl.com/search/${searchType}?q=${encodeURIComponent(query)}&page=1&limit=10&client_id=${CLIENT_ID}`);
        if (!response.ok) throw new Error("Error fetching search results.");

        const results = await response.json();

        // Create or Clear the search results section
        let searchResults = document.getElementById('search-results');
        if (!searchResults) {
            searchResults = document.createElement('section');
            searchResults.id = 'search-results';
            searchResults.className = 'search-popup';
            searchResults.innerHTML = `
                <button id="closeSearchButton">✖️</button>
                <div class="carousel"></div>
            `;
            document.body.appendChild(searchResults);

            // Add click event to close the popup
            document.getElementById('closeSearchButton').addEventListener('click', () => {
                searchResults.remove();
            });
        } else {
            searchResults.querySelector('.carousel').innerHTML = '';
        }

        //  Loop through and display
        results.forEach(result => renderCard(searchResults.querySelector('.carousel'), result, searchType));

    } catch (error) {
        console.error("Failed to load search results:", error);
    }
}

// Helper function to construct image URL
function getImageUrl(posterPath, tmdbId) {
    if (posterPath) {
       
        return `https://simkl.in/posters/${posterPath}_w.jpg`;
    } else if (tmdbId) {
        
        return `https://image.tmdb.org/t/p/w500/${tmdbId}`;
    } else {
        
        return 'https://via.placeholder.com/200x300?text=No+Image';
    }
}


function scrollCarousel(sectionId, direction) {
    const container = document.querySelector(`#${sectionId} .carousel`);
    const scrollAmount = 300; // Adjust this value for smoother scroll
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}







const addToWatchlist = (movie) => {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    //  Avoid duplicates
    if (watchlist.find(item => item.simkl_id === movie.simkl_id)) {
        alert("This movie is already in your watchlist!");
        return;
    }

    watchlist.push(movie);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    alert(`${movie.title} added to your Watchlist!`);
};


function renderCard(container, show, type) {
    const idSet = type === 'movie' ? movieIds : tvIds;

    if (idSet.has(show.ids.simkl_id)) {
        console.log(`Duplicate avoided: ${show.title}`);
        return;
    }

    idSet.add(show.ids.simkl_id);


    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', show.ids.simkl_id);

    const img = document.createElement('img');
    img.src = getImageUrl(show.poster);
    img.alt = show.title || "No Title";

    const title = document.createElement('p');
    const releaseYear = show.year || (show.date ? new Date(show.date).getFullYear() : null);
    title.textContent = releaseYear ? `${show.title} (${releaseYear})` : show.title;

    const button = document.createElement('button');
    button.className = 'add-to-watchlist';
    button.textContent = "Add to Watchlist";

    // Add to Watchlist on click
    button.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const movieData = {
            title: show.title,
            type: type,
            poster: getImageUrl(show.poster),
            simkl_id: show.ids.simkl_id,
            date_added: new Date().toISOString()
        };
        addToWatchlist(movieData);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(button); 

    // Click Event to Show Details
    card.addEventListener('click', () => showDetails(show.ids.simkl_id, type));

    // Append to container
    container.appendChild(card);
}



fetchTrendingMovies();
fetchTrendingTV();
