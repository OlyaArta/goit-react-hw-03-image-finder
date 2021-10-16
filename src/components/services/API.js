import { BASE_URL, API_KEY } from "../services/basic";
import axios from "axios";

async function fetchImages(searchQuery, page) {
  const url = `${BASE_URL}/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const { data } = await axios.get(url);
  console.log(data);

  return data.hits;
}

// function fetchImages(searchQuery, page) {
//   const url = `${BASE_URL}/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
//   return fetch(url)
//     .then((response) => response.json())
//     .then(({ hits }) => {
//       console.log("hits", hits);
//       return hits;
//     });
// }

export default fetchImages;
