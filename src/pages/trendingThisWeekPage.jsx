import React from "react";
import { getTrendingThisWeek } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites"; 

const TrendingThisWeekPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["trendingThisWeek"],
    queryFn: getTrendingThisWeek,
  });

  if (isPending) return <Spinner />;

  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <PageTemplate
      title="Trending This Week"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default TrendingThisWeekPage;
