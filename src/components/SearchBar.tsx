import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMovies } from "@/hooks/useMoviesContext";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useMovies();

  return (
    <div className="relative max-w-md mx-auto mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search by title, year, genre, or director..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
