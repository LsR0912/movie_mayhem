import { useEffect, useState } from "react";
import "./MovieRater.css";

// Backend URL and tmdb Image URL
const API_URL = "http://127.0.0.1:8000/api/movies/";
const posterUrl = "https://image.tmdb.org/t/p/w500/";

// Movie Interface
interface Movie {
  id: number;
  tmdb_id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<{ [id: string]: number }>({});
  const [showCustomFilter, setShowCustomFilter] = useState(false);
  const [yearFilter, setYearFilter] = useState<string>("");

  const [favorites, setFavorites] = useState<number[]>(() => {
    // Load favorites from localStorage if available
    const stored = localStorage.getItem("favoriteMovies");
    return stored ? JSON.parse(stored) : [];
  });

  // Handle like/unlike
  const handleLike = (id: number) => {
    setFavorites((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((favId) => favId !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem("favoriteMovies", JSON.stringify(updated));
      return updated;
    });
  };

  const handleRating = (id: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
    // Optionally, save to localStorage
    // localStorage.setItem('movieRatings', JSON.stringify({ ...ratings, [id]: rating }));
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data); // <-- Use data directly
        setLoading(false);
      });
  }, []);

  // Filter movies by release year if yearFilter is set
  const filteredMovies = yearFilter
    ? movies.filter(
        (movie) =>
          movie.release_date && movie.release_date.startsWith(yearFilter)
      )
    : movies;

  const customFilteredMovies = movies
    .filter(
      (movie) =>
        movie.vote_average < 8.9 &&
        new Date(movie.release_date) < new Date("2025-12-31")
    )
    .sort((a, b) => b.vote_average - a.vote_average);

  return (
    <div>
      <h2>Rate Your Favorite Movies</h2>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="yearFilter">Filter by release year: </label>
        <input
          id="yearFilter"
          type="number"
          min="1980"
          max={new Date().getFullYear()}
          placeholder="e.g. 2020"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          style={{ width: 100 }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setShowCustomFilter((prev) => !prev)}
          style={{ marginRight: 8 }}
        >
          {showCustomFilter ? "Show All" : "Apply SQL Filter"}
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {(showCustomFilter ? customFilteredMovies : filteredMovies).map(
          (movie) => (
            <div
              key={movie.id}
              className="movieCard"
              onClick={() => alert(`Clicked on ${movie.title}`)}
            >
              {/* ...existing card content... */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(movie.id);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  position: "absolute",
                  right: 8,
                  top: 8,
                  fontSize: 24,
                  color: favorites.includes(movie.id) ? "#e74c3c" : "#bbb",
                  zIndex: 2,
                }}
                title={
                  favorites.includes(movie.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                aria-label={favorites.includes(movie.id) ? "Unlike" : "Like"}
                data-testid={`like-btn-${movie.id}`}
              >
                {favorites.includes(movie.id) ? "♥" : "♡"}
              </button>
              <img
                src={posterUrl + movie.poster_path}
                alt={movie.title}
                style={{
                  width: "100%",
                  display: "block",
                  position: "relative",
                }}
              />
              <h4 style={{ marginTop: 8 }}>
                ({movie.release_date}) {movie.title} ({movie.vote_average})
              </h4>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      cursor: "pointer",
                      color: ratings[movie.id] >= star ? "gold" : "#ccc",
                      fontSize: 24,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRating(movie.id.toString(), star);
                    }}
                    data-testid={`star-${movie.id}-${star}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div>Your rating: {ratings[movie.id] || "Not rated"}</div>
              {favorites.includes(movie.id) && (
                <div
                  style={{ color: "#e74c3c", fontWeight: "bold", marginTop: 4 }}
                >
                  In Favorites
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MovieList;
