import React from "react";

export default function Home() {
  return (
    <div className="heroSection text-center p-8 mt-2">
      <h2 className="font-semibold mb-4 text-destructive text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl px-2">
        Welcome to MovieMart
      </h2>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl px-2">
        Your one-stop destination for all your movie needs. Explore, search, and enjoy a vast collection of movies.
      </p>
    </div>
  );
}