import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const optionsUkr = {
  params: { language: "uk" },
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjYwOTFmNmJmMzI3NmM1MzBmMTE1MDliNTFiOGJlNCIsInN1YiI6IjY2MmY4ZjMyNjBiNThkMDEyM2RlZTg2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jCe1Ct73wROZSN9ikU2myrebqBvddXF6LkORlHyvVEw",
  },
};

const optionsEng = {
  method: "GET",
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjYwOTFmNmJmMzI3NmM1MzBmMTE1MDliNTFiOGJlNCIsInN1YiI6IjY2MmY4ZjMyNjBiNThkMDEyM2RlZTg2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jCe1Ct73wROZSN9ikU2myrebqBvddXF6LkORlHyvVEw",
  },
};

export async function getTrendingMovies() {
  const response = await axios.get("trending/movie/week", optionsUkr);
  return response.data.results;
}

export async function getMovieDetails(id) {
  const response = await axios.get(`movie/${id}`, optionsUkr);
  return response.data;
}

export async function searchMovies(search) {
  const response = await axios.get(
    `search/movie?page=1&query=${search}`,
    optionsUkr
  );
  return response.data.results;
}

export async function getMovieCast(id) {
  const response = await axios.get(`movie/${id}/credits`, optionsUkr);
  return response.data;
}

export async function getMovieTrailer(id) {
  const response = await axios.get(`movie/${id}/videos`, optionsUkr);
  return response.data.results;
}

export async function getMovieReviews(id) {
  const response = await axios.get(`movie/${id}/reviews`, optionsEng);
  return response.data;
}
