const CLIENT_ID = 'a0c77ae72ca4ed2c4e25d3d5137baaf718bb31497722e9e9718f4d46a856e7dd';
const movieGenreChartElement = document.getElementById('movieGenreChart');
const tvGenreChartElement = document.getElementById('tvGenreChart');

//  Fetch Trending Movies
const fetchTrendingMovies = async () => {
    try {
        const response = await fetch(`https://api.simkl.com/movies/trending?extended=overview,theater,metadata,tmdb,genres&client_id=${CLIENT_ID}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const movies = await response.json();

        //  Extract genres and count occurrences
        const genreCount = {};
        movies.forEach(movie => {
            if (movie.genres) {
                movie.genres.forEach(genre => {
                    genreCount[genre] = (genreCount[genre] || 0) + 1;
                });
            }
        });

        //  Prepare data for Chart.js
        const labels = Object.keys(genreCount);
        const data = Object.values(genreCount);

        //  Render the chart
        new Chart(movieGenreChartElement, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Trending Movies by Genre',
                    data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.error("Failed to fetch trending movies for chart:", error);
    }
};

//  Fetch Trending TV Shows
const fetchTrendingTVShows = async () => {
    try {
        const response = await fetch(`https://api.simkl.com/tv/trending?extended=overview,theater,metadata,tmdb,genres&client_id=${CLIENT_ID}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const shows = await response.json();

        //  Extract genres and count occurrences
        const genreCount = {};
        shows.forEach(show => {
            if (show.genres) {
                show.genres.forEach(genre => {
                    genreCount[genre] = (genreCount[genre] || 0) + 1;
                });
            }
        });

        //  Prepare data for Chart.js
        const labels = Object.keys(genreCount);
        const data = Object.values(genreCount);

        //  Render the chart
        new Chart(tvGenreChartElement, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Trending TV Shows by Genre',
                    data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.error("Failed to fetch trending TV shows for chart:", error);
    }
};

fetchTrendingMovies();
fetchTrendingTVShows();
