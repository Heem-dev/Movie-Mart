import { useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";

export function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
}
