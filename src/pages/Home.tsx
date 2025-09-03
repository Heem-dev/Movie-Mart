import { useMemo } from "react";
import { useMovies } from "../hooks/useMovies";

export default function Home() {
  const { movies: allMovies, loading, error } = useMovies();
  const movies = useMemo(() => {
    if (allMovies.length === 0) return [];
    return allMovies.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [allMovies]);

  if (loading)
    return (
      <div className="heroSection text-center p-8 mt-2">
        <p className="text-gray-600">Loading movies...</p>
      </div>
    );
  if (error)
    return (
      <div className="heroSection text-center p-8 mt-2">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="heroSection text-center p-8 mt-2">
      <h2 className="font-semibold mb-4 text-destructive text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl px-2">
        Welcome to MovieMart
      </h2>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl px-2 mb-8">
        Your one-stop destination for all your movie needs. Explore, search, and
        enjoy a vast collection of movies.
      </p>

      <div
        className="mx-auto max-w-4xl flex justify-center items-end overflow-visible px-4"
        style={{ minHeight: "18rem" }}
      >
        <div className="flex items-end justify-center relative space-x-0">
          {movies[0] && movies[0].Poster && movies[0].Poster !== "N/A" && (
            <div className="transform -rotate-12 md:-rotate-10 -translate-x-6 md:-translate-x-10 scale-90 md:scale-95 z-10">
              <img
                src={movies[0].Poster}
                alt={movies[0].Title}
                className="w-24 h-36 sm:w-32 sm:h-48 md:w-44 md:h-64 lg:w-56 lg:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {movies[1] && movies[1].Poster && movies[1].Poster !== "N/A" && (
            <div className="relative z-20 -mx-6 md:-mx-8">
              <img
                src={movies[1].Poster}
                alt={movies[1].Title}
                className="w-36 h-56 sm:w-44 sm:h-68 md:w-64 md:h-96 lg:w-72 lg:h-[28rem] object-cover rounded-lg shadow-xl"
              />
            </div>
          )}

          {movies[2] && movies[2].Poster && movies[2].Poster !== "N/A" && (
            <div className="transform rotate-12 md:rotate-10 translate-x-6 md:translate-x-10 scale-90 md:scale-95 z-10">
              <img
                src={movies[2].Poster}
                alt={movies[2].Title}
                className="w-24 h-36 sm:w-32 sm:h-48 md:w-44 md:h-64 lg:w-56 lg:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}