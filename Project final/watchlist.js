// Watchlist Renderer
const watchlistContainer = document.getElementById('watchlist-items');
const modal = document.getElementById('movie-details');
const getWatchlist = () => {
    return JSON.parse(localStorage.getItem('watchlist')) || [];
};

// Helper function to construct image URL
const getImageUrl = (posterPath) => {
    if (!posterPath) return 'https://via.placeholder.com/200x300?text=No+Image';
    return posterPath;
};

// Render Watchlist Items
const renderWatchlist = () => {
    watchlistContainer.innerHTML = ''; // Clear existing content
    const watchlist = getWatchlist();

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = "<p>No items in your watchlist.</p>";
        return;
    }

    watchlist.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = item.poster;
        img.alt = item.title;

        const title = document.createElement('p');
        title.textContent = item.title;

        // Add Remove Button
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-from-watchlist';
        removeButton.textContent = 'Remove';

        removeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromWatchlist(item.simkl_id);
            renderWatchlist(); // Refresh the list
        });

        // Click Event to Show Details
        card.addEventListener('click', () => showDetails(item.simkl_id, item.type));

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(removeButton);

        watchlistContainer.appendChild(card);
    });
};

// Remove from Watchlist
const removeFromWatchlist = (simkl_id) => {
    let watchlist = getWatchlist();
    watchlist = watchlist.filter(item => item.simkl_id !== simkl_id);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
};

// Function to Show Details in Modal
const showDetails = async (id, type) => {
    modal.classList.remove('hidden');
    modal.style.display = "block";
    modal.style.opacity = 0;
    setTimeout(() => modal.style.opacity = 1, 100);

    const endpoint = type === 'movie' 
        ? `https://api.simkl.com/movies/${id}?extended=full&client_id=a0c77ae72ca4ed2c4e25d3d5137baaf718bb31497722e9e9718f4d46a856e7dd`
        : `https://api.simkl.com/tv/${id}?extended=full&client_id=a0c77ae72ca4ed2c4e25d3d5137baaf718bb31497722e9e9718f4d46a856e7dd`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();

        // Fill Modal Content
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
};

// Close the Modal
document.getElementById('closeButton').addEventListener('click', () => {
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.add('hidden');
    }, 300);
});


renderWatchlist();