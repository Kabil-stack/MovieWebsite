const global = {
  CurrentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalpages: 1,
    totalresults: 0,
  },
  api: {
    apikey: "ddaa49bb38f7a1bd1cf7c3abdc75a975",
    apiurl: "https://api.themoviedb.org/3/",
  },
};

async function displaypopularmovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
     
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release:${movie.release_date}</small>
            </p>
          </div>
        `;
    const popular = document.getElementById("popular-movies");
    popular.appendChild(div);
  });
}

async function displaypopularshows() {
  const { results } = await fetchAPIData("tv/popular");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
     
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="http://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${show.name}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired Date:${
                show.first_air_date
              }</small>
            </p>
          </div>
        `;
    const popular = document.getElementById("popular-shows");
    popular.appendChild(div);
  });
}

async function displaymoviedetails() {
  const movieid = window.location.search.split("=")[1];
  const movie = await fetchAPIData(`movie/${movieid}`);
  console.log(movie.poster_path);

  displaybackgroundimage("movie", movie.poster_path);
  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
            ${
              movie.poster_path
                ? `<img
              src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
            }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString()}</li>
            <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString()}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((comp) => `<span> ${comp.name}</span>`)
            .join(",")}</div>
        </div>`;

  const moviedetails = document.getElementById("movie-details");
  moviedetails.appendChild(div);
}

async function displayshowdetails() {
  const showid = window.location.search.split("=")[1];
  console.log(showid);
  const show = await fetchAPIData(`tv/${showid}`);
  console.log(show.poster_path);
  console.log(show.seasons[0].air_date);

  displaybackgroundimage("tv", show.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
             ${
               show.poster_path
                 ? `<img
              src="http://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                 : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${show.name}"
                />`
             }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">First-Aired Date: ${
              show.seasons[0].air_date
            }</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.name
              }
  
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>

          <div class="list-group">${show.production_companies
            .map((comp) => `<span> ${comp.name}</span>`)
            .join(",")}</div>
        </div>`;

  const showdetails = document.getElementById("show-details");
  showdetails.appendChild(div);
}

async function showswiper() {
  const { results } = await fetchAPIData("movie/now_playing");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              <img src="http://image.tmdb.org/t/p/w500${
                movie.poster_path
              }" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
                1
              )} / 10
            </h4>
          `;
    document.querySelector(".swiper-wrapper").appendChild(div);
    initswiper();
  });
}

function initswiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

function showspinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hidespinner() {
  document.querySelector(".spinner").classList.remove("show");
}

function displaybackgroundimage(type, backgroundpath) {
  const overlay = document.createElement("div");

  overlay.style.backgroundImage = `url(
    "http://image.tmdb.org/t/p/original${backgroundpath}"
  )`;
  overlay.style.backgroundSize = "cover";
  overlay.style.backgroundPosition = "center";
  overlay.style.backgroundRepeat = "no-repeat";
  overlay.style.height = "100vh";
  overlay.style.width = "100vw";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.zIndex = "-1";
  overlay.style.opacity = "0.1";

  if (type === "movie") {
    const container = document.querySelector("#movie-details");
    container.style.position = "relative";
    container.appendChild(overlay);
  } else {
    const container = document.querySelector("#show-details");
    container.style.position = "relative";
    container.appendChild(overlay);
  }
}
async function fetchAPIData(endpoint) {
  const API_key = global.api.apikey;
  const API_URL = global.api.apiurl;
  showspinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_key}&language=en-US`
  );
  hidespinner();
  const data = await response.json();
  return data;
}

function highlightactivelink() {
  const links = document.querySelectorAll(".nav-link");
  console.log(global.CurrentPage);

  links.forEach((lk) => {
    if (lk.pathname === global.CurrentPage) {
      lk.classList.add("active");
    }
  });
}

async function searchmovieTv() {
  const queryString = window.location.search;
  const urlparams = new URLSearchParams(queryString);
  global.search.type = urlparams.get("type");
  global.search.term = urlparams.get("search-term");
  console.log(global.search.term);

  if (global.search.term !== "" && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchApidata();
    global.search.page = page;
    global.search.totalpages = total_pages;
    global.search.totalresults = total_results;
    if (results.length === 0) {
      showAlert("No Results found", "alert");
    }
    displaySearchresult(results);
    document.querySelector(".search-term").value = "";
  } else {
    showAlert("Please Enter Search term");
  }
}

function displaySearchresult(results) {
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
     
          <a href="movie-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
              src="http://image.tmdb.org/t/p/w500/${result.poster_path}"
              class="card-img-top"
              alt="${
                global.search.type === "movie" ? result.title : result.name
              }"
            />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${
                    global.search.type === "movie" ? result.title : result.name
                  }"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release:${
                global.search.type === "movie"
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>
        `;
    document.getElementById("search-results-heading").innerHTML = `
    <h2>${results.length} of ${global.search.totalresults} Results for ${global.search.term}</h2>`;
    const search = document.getElementById("search-results");
    search.appendChild(div);
  });
  displaypagination();
}
function displaypagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalpages}</div>`;
  document.getElementById("pagination").appendChild(div);

  if (global.search.page === 1) {
    document.getElementById("prev").disabled = true;
  }

  if (global.search.page === global.search.totalpages) {
    document.getElementById("next").disabled = true;
  }

  document.getElementById("next").addEventListener("click", async () => {
    global.search.page++;
    const { results, total_pages } = await searchApidata();
    displaySearchresult(results);
  });

  document.getElementById("prev").addEventListener("click", async () => {
    global.search.page--;
    const { results, total_pages } = await searchApidata();
    displaySearchresult(results);
  });
}
async function searchApidata() {
  const API_key = global.api.apikey;
  const API_URL = global.api.apiurl;
  showspinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_key}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  hidespinner();
  const data = await response.json();
  return data;
}

function showAlert(message, clasName = "alert-error") {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", clasName);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertEl);
  setTimeout(() => alertEl.remove(), 3000);
}

function init() {
  switch (global.CurrentPage) {
    case "/flixx-app-theme/index.html":
      showswiper();
      displaypopularmovies();
      break;
    case "/flixx-app-theme/movie-details.html":
      displaymoviedetails();
      break;

    case "/flixx-app-theme/tv-details.html":
      console.log("shows");
      displayshowdetails();
      break;
    case "/flixx-app-theme/shows.html":
      displaypopularshows();
      break;
    case "/flixx-app-theme/search.html":
      searchmovieTv();
      console.log(global.search.totalPages);
      break;
  }
  highlightactivelink();
}
document.addEventListener("DOMContentLoaded", init);
