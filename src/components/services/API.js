import { BASE_URL, API_KEY } from "./basic";

function fetchImages(searchQuery, page) {
  const url = `${BASE_URL}/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url)
    .then((response) => response.json())
    .then(({ hits }) => {
      console.log("hits", hits);
      return hits;
    });
}

export default fetchImages;
