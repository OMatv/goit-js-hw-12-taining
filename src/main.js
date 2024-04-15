// import axios from 'axios';

// Створи фільмотеку з популярними фільмами

const BASE_URL = ' https://api.themoviedb.org/3';
const END_POINT = 'trending/movie/week';
const API_KEY = '345007f9ab440e5b86cef51be6397df1';

// axios({
//   url: `${BASE_URL}${END_POINT}`,
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer 'accept: application/json',
//   },
// })

let page = 1;

const selectors = {
  container: document.querySelector('.js-movie-list'),
  loadBtn: document.querySelector('.js-load-more'),
};

selectors.loadBtn.addEventListener('click', loadMore);

serviceMovie(page)
  .then(data => {
    selectors.container.insertAdjacentHTML(
      'beforeend',
      createMarkup(data.results)
    );
    //   if (data.page <= data.total_pages) {}
    if (data.page < 500) {
      selectors.loadBtn.classList.replace('load-more-hidden', 'load-more');
    }
  })

  .catch(error => alert(error.message));

async function serviceMovie(page = 1) {
  const { data } = await axios(`${BASE_URL}${END_POINT}`, {
    params: {
      api_key: API_KEY,
      page,
    },
  });
  return data;
}

function createMarkup(arr) {
  return arr
    .map({
      id,
      poster_path,
      original_title,
      release_date,
      vote_average,
    })(
      `
    <li class="movie-card" data-id="${id}" >
            <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}>
            <div class="movie-info">
            <h2>${original_title}</h2>
            <p>Release Date: ${release_date}</p>
            <p>Vote Average: ${vote_average}</p>
            </div>
        `
    )
    .join('');
}

async function loadMore() {
  page += 1;

  selectors.loadBtn.disabled = true;

  try {
    const data = await serviceMovie(page);
    selectors.container.insertAdjacentHTML(
      'beforeend',
      createMarkup(data.results)
    );

    selectors.loadBtn.disabled = false;

    if (data.page >= 500) {
      selectors.loadBtn.classList.replace('load-more', 'load-more-hidden');
    }
  } catch (error) {
    alert(error.message);
  }
}
