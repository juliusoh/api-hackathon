// select elements from the DOM
const API_KEY = '37bdb8486fb959414ee9164606b9ea9a';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=37bdb8486fb959414ee9164606b9ea9a';

const searchButton = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');

const movieClick = (event) => {
  const target = event.target;

  if (target.tagName.toLowerCase() === 'img') {
    //console.log('hello');
    console.log(event);
    const movieId = target.dataset.movieId
    console.log(movieId);
    const section = event.target.parentElement; //section
    //console.log(section);
    const content = section.nextElementSibling; //content
    content.classList.add('content-display');

    const path = `/movie/${movieId}/videos`;
    const url = generateUrl(path);
    $.ajax({
      method: "GET",
      url: url,
      success: (info) => {
        console.log('videos:', info);
        const videos = info.results;
        const length = videos.length > 4 ? 4 : videos.length;
        const iframeContainer = document.createElement('div');
        for (let i = 0; i < length; i++) {
          const video = videos[i] // video
          const iframe = createIframe(video);
          iframeContainer.appendChild(iframe);
          content.appendChild(iframeContainer);
        }
      },
      error: searchError
    })
  }

  if (target.id === 'content-close') {
    const content = target.parentElement;
    content.classList.remove('content-display');
  }
  
}

function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=37bdb8486fb959414ee9164606b9ea9a`;
  return url;
}

function movieSection(movies) {
 return movies.map((movie) => {
   if (movie.poster_path) {

    return `<img
      src=${IMAGE_URL + movie.poster_path}
      data-movie-id=${movie.id}
    />`;
    }
  });
}


function createMovieContainer(movies) {
  const movieElement = document.createElement('div');
  movieElement.setAttribute('class', 'movie');
  movieElement.addEventListener('click', movieClick);
  blah(1, abc());
  const movieTemplate = `
  <section class="section">
    ${movieSection(movies)}
  </section>
  <div class ="content">
    <p id="content-close">X</p>
  </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data) {
  movieSearchable.innerHTML = '';
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  movieSearchable.appendChild(movieBlock);
}

searchButton.onclick = (e) => {
  e.preventDefault();
  const value = inputElement.value;
  const path = '/search/movie';
  const newUrl = generateUrl(path) + '&query=' + value;
  
  $.ajax({
    method: "GET",
    url: newUrl,
    success: (info) => {
      searchSuccess(info);
      renderSearchMovies(info)
      inputElement.value = '';
    },
    error: searchError
  })

  console.log(`value: ${value}`);
}

function searchSuccess(data) {
  console.log(data)
}

function searchError(error) {
  console.log(error);
}

function createIframe(video) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  console.log(iframe.src);
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;

  return iframe;
}

