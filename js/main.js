getMovies();

function getMovies(){
  axios.get('https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-20&byTags=genre:action&byYear=2017&byProgramType=movie')
    .then((response) => {
      console.log(response);
      let movies = response.data;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.plprogram$thumbnails}">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${movie.imdbId}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('id', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('id');

  axios.get('https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/106608168011?form=json'+movieId)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.plprogram$thumbnails}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.plprogram$title}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.tdc$sortDate}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.plprogram$ratings}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbId}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.plprogram$personName}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.plprogram$personName}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.description}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbId}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
