import { useState } from "react";
import { useMovies } from "@/hooks/useMoviesContext";
import { useCart } from "@/hooks/useCart";
import type { Movie } from "@/context/MoviesContext";
import { SearchBar } from "@/components/SearchBar";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

function Poster({ poster, title }: { poster: string; title: string }) {
  return (
    <div className="w-full aspect-[2/3] rounded-md overflow-hidden bg-muted">
      <img
        src={poster}
        alt={title}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    addToCart(movie, quantity);
    setQuantity(1);
  };

  return (
    <Card>
      <CardContent>
        <Poster poster={movie.poster} title={movie.title} />
        <div className="mt-3">
          <CardTitle className="text-sm">{movie.title}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {movie.year} • {movie.genre || "Action"}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <div className="text-sm font-medium">${movie.price.toFixed(2)}</div>
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="outline" 
              className="h-8 w-8"
              onClick={handleDecrement}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 h-8 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            />
            <Button 
              size="icon" 
              variant="outline" 
              className="h-8 w-8"
              onClick={handleIncrement}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button 
          size="sm" 
          variant="default" 
          className="w-full"
          onClick={handleAddToCart}
          aria-label={`Add ${movie.title} to cart`}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Shop() {
  const { filteredMovies, loading, error } = useMovies();

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="font-semibold mb-2 text-destructive text-lg sm:text-xl md:text-2xl">
            Shop Movies
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6">
            Browse and add movies to your cart.
          </p>
          <SearchBar />
          <div className="text-center text-sm text-gray-500">Loading movies...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="font-semibold mb-2 text-destructive text-lg sm:text-xl md:text-2xl">
            Shop Movies
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6">
            Browse and add movies to your cart.
          </p>
          <SearchBar />
          <div className="text-center text-sm text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="font-semibold mb-2 text-destructive text-lg sm:text-xl md:text-2xl">
          Shop Movies
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-6">
          Browse and add movies to your cart.
        </p>
        <SearchBar />
      </div>

      {filteredMovies.length === 0 ? (
        <div className="text-center text-sm text-gray-500">No movies found.</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}