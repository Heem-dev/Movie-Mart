import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="text-center p-8">
      <h2 className="font-semibold mb-4 text-destructive text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl px-2">
        404 — Page Not Found
      </h2>
      <Link to="/" className="text-primary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl px-2 hover:underline">
        Go Home
      </Link>
    </div>
  );
}