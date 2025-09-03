// filepath: /Users/ibrahim/Documents/VS Code Workspace/Projects/Movie-Mart/src/hooks/useMovies.ts
import { useState, useEffect } from "react";
import { topRatedMovies } from "../data/topRatedMovies";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

const CACHE_KEY = "movieMartMovies";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Check localStorage for cached data
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setMovies(data);
            setLoading(false);
            return;
          }
        }

        // Fetch all 20 movies
        const moviePromises = topRatedMovies.map(async (title) => {
          const response = await fetch(
            `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=9277d4ad`
          );
          const data = await response.json();
          if (data.Response === "True") {
            return data as Movie;
          } else {
            throw new Error(`Failed to fetch ${title}`);
          }
        });

        const fetchedMovies = await Promise.all(moviePromises);

        // Cache the data
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: fetchedMovies, timestamp: Date.now() })
        );

        setMovies(fetchedMovies);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};