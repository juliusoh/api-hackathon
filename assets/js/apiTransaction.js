const API_KEY = '37bdb8486fb959414ee9164606b9ea9a'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const url = 'https://api.themoviedb.org/3/search/movie?api_key=37bdb8486fb959414ee9164606b9ea9a'

function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=37bdb8486fb959414ee9164606b9ea9a`
  return url;
}

function requestMovies(url, searchSuccess, searchError, header) {
  $.ajax({
    method: "GET",
    url: url,
    success: (info) => {
      //console.log(info);
      searchSuccess(info, header);
     
    },
    error: searchError
  })
}

function searchMovie(value) {
  const path = '/search/movie';
  const url = generateUrl(path) + '&query=' + value;
  requestMovies(url, renderSearchMovies, searchError);
}

function getNowPlayingMovies() {
  const path = '/movie/now_playing';
  const url = generateUrl(path);
  requestMovies(url, renderMovies, searchError, 'Now Playing Movies');
}

function getUpcomingMovies() {
  const path = '/movie/upcoming';
  const url = generateUrl(path);
  // const upcoming = document.createElement('h1');
  // upcoming.textContent = 'Upcoming Movies'
  // moviesContainer.appendChild(upcoming)
  requestMovies(url, renderMovies, searchError, 'Upcoming Movies' );
}

function getTopRatedMovies() {
  const path = '/movie/top_rated';
  const url = generateUrl(path);
  // const upcoming = document.createElement('h1');
  // upcoming.textContent = 'Upcoming Movies'
  // moviesContainer.appendChild(upcoming)
  requestMovies(url, renderMovies, searchError, 'Top Rated Movies');
}

function getPopularMovies() {
  const path = '/movie/popular';
  const url = generateUrl(path);

  requestMovies(url, renderMovies, searchError, 'Popular Movies');
}



window.addEventListener('DOMContentLoaded', (event) => {
  var modal = document.getElementById("myModal");

// Get the button that opens the modal

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
});


