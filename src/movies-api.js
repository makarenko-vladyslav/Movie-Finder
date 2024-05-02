import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjYwOTFmNmJmMzI3NmM1MzBmMTE1MDliNTFiOGJlNCIsInN1YiI6IjY2MmY4ZjMyNjBiNThkMDEyM2RlZTg2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jCe1Ct73wROZSN9ikU2myrebqBvddXF6LkORlHyvVEw",
  },
};

export async function getTrendingMovies() {
  const response = await axios.get("trending/movie/week", options);
  return response.data.results;
}

export async function getPopularMovies() {
  const response = await axios.get("/movie/popular", options);
  return response.data.results;
}

export async function getMoviesById(id) {
  const response = await axios.get(`movie/${id}`, options);
  return response.data;
}

export async function searchMovies(search, page) {
  const response = await axios.get(
    `search/movie?page=${page}&query=${search}`,
    options
  );
  return response.data.results;
}

export async function getMovieCast(id) {
  const response = await axios.get(`movie/${id}/credits`, options);
  return response.data;
}

export async function getMovieTrailer(id) {
  const response = await axios.get(`movie/${id}/videos`, options);
  return response.data.results;
}

export async function getMovieReviews(id) {
  const response = await axios.get(`movie/${id}/reviews`, options);
  return response.data;
}
