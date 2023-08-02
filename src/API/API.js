const url = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}`;

const config = {
  method: 'GET',
  mode: 'cors',
}

export async function omdb({ value = '', page = 1, year = null, type = null }) {
  year = year ? `y=${year}` : '';
  type = type ? `type=${type}` : '';
  return fetch(`${url}&s=${value}&page=${page}` + year + type, config);
}