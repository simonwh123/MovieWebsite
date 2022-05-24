getMovies();

function getMovies() {
  axios.get('https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-20&byTags=genre:action&byYear=2017&byProgramType=movie')
    .then((response) => {
      console.log(response);
      let movies = response.data.entries;
      let output = '';
      $.each(movies, (entryCount, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.plprogram$thumbnails["orig-594x408"].plprogram$url}">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Vis mere</a>
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

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {

  axios.get('https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-20&byTags=genre:action&byYear=2017&byProgramType=movie')
    .then((response) => {
      console.log(response);
      movieId = sessionStorage.getItem('movieId');
      let movies = response.data.entries;
      console.log(movieId);

      movies.forEach(element => {
        if (element.id == movieId) {
          console.log(element);
          output = `
          <div class="row">
            <div class="col-md-4">
              <img src="${element.plprogram$thumbnails["orig-594x408"].plprogram$url}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${element.title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${element.title}</li>
                <li class="list-group-item"><strong>Released:</strong> ${element.tdc$sortDate}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${element.plprogram$ratings}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${element.tdc$imdbId}</li>
                <li class="list-group-item"><strong>Director:</strong> ${element.plprogram$personName}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${element.plprogram$personName}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Plot</h3>
              ${element.description}
              <hr>
              <a href="http://imdb.com/title/${element.tdc$imdbId}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-default">Go Back To Search</a>
            </div>
          </div>
        `;

        }
      });

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
