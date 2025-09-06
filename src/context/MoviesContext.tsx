import { createContext, useState, useEffect, type ReactNode } from "react";

export interface Movie {
  id: string;
  title: string;
  year: number;
  poster: string;
  price: number;
  imdbID: string;
  genre?: string;
  director?: string;
  plot?: string;
}

interface MoviesContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredMovies: Movie[];
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export { MoviesContext };

const CACHE_KEY = "movieMartMovies";
const CACHE_DURATION = 24 * 60 * 60 * 1000;
const OMDB_API_KEY = "9277d4ad";

const topRatedMovieTitles = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "Pulp Fiction",
  "Forrest Gump",
  "Inception",
  "The Matrix",
  "Goodfellas",
  "The Silence of the Lambs",
  "Schindler's List",
  "Fight Club",
  "The Lord of the Rings: The Fellowship of the Ring",
  "Star Wars: Episode V - The Empire Strikes Back",
  "The Usual Suspects",
  "Se7en",
  "The Lion King",
  "Gladiator",
  "Titanic",
  "The Avengers",
  "Interstellar"
];

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setMovies(data);
            setLoading(false);
            return;
          }
        }

        const moviePromises = topRatedMovieTitles.map(async (title) => {
          try {
            const response = await fetch(
              `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`
            );
            const data = await response.json();
            
            if (data.Response === "True") {
              return {
                id: data.imdbID,
                title: data.Title,
                year: parseInt(data.Year),
                poster: data.Poster !== "N/A" ? data.Poster : `https://picsum.photos/seed/${data.imdbID}/400/600`,
                price: 9.99,
                imdbID: data.imdbID,
                genre: data.Genre,
                director: data.Director,
                plot: data.Plot,
              } as Movie;
            } else {
              console.warn(`Failed to fetch ${title}: ${data.Error}`);
              return null;
            }
          } catch (err) {
            console.warn(`Error fetching ${title}:`, err);
            return null;
          }
        });

        const fetchedMovies = await Promise.all(moviePromises);
        const validMovies = fetchedMovies.filter((movie): movie is Movie => movie !== null);

        if (validMovies.length === 0) {
          throw new Error("Failed to fetch any movies");
        }

        setMovies(validMovies);

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: validMovies,
            timestamp: Date.now(),
          })
        );
        setLoading(false);
      } catch {
        setError("Failed to load movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.year.toString().includes(searchQuery) ||
    movie.genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.director?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const value: MoviesContextType = {
    movies,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filteredMovies,
  };

  return (
    <MoviesContext.Provider value={value}>
      {children}
    </MoviesContext.Provider>
  );
}
