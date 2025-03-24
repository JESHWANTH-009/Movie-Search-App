// API Key and Base URL
const API_KEY = "d539fbc9";  // Replace with your OMDB API key
const BASE_URL = "https://www.omdbapi.com/";

// Display movies in grid format
function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = ''; 

    if (movies.length === 0) {
        moviesContainer.innerHTML = '<p>No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        
        // Click event to display movie details
        movieElement.onclick = () => fetchMovieDetails(movie.imdbID);

        movieElement.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300'}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <p>${movie.Year}</p>
        `;

        moviesContainer.appendChild(movieElement);
    });
}

// Search movies by title
async function searchMovies() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return alert('Please enter a movie title');

    const loadingElement = document.getElementById('loading');
    loadingElement.classList.remove('hidden');

    try {
        const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();

        loadingElement.classList.add('hidden');

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            alert(data.Error);
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        alert('Failed to load movies');
    }
}

// Fetch and display movie details in modal
async function fetchMovieDetails(imdbID) {
    try {
        const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
        const movie = await response.json();

        const modal = document.getElementById('movie-modal');
        const movieDetails = document.getElementById('movie-details');

        movieDetails.innerHTML = `
            <h2>${movie.Title} (${movie.Year})</h2>
            <p>⭐ ${movie.imdbRating}</p>
            <p>${movie.Plot}</p>
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300'}" alt="${movie.Title}" />
        `;

        modal.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching movie details:', error);
        alert('Failed to load movie details');
    }
}

// Close modal function
function closeModal() {
  const modal = document.getElementById('movie-modal');
  modal.classList.add('hidden');
}

