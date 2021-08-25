using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieBooking.Contracts.DTO;
using MovieBooking.Contracts.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MovieBookingApi.Controllers
{
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;
        public MoviesController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet("movies/{imdbID}")]
        public IActionResult GetMovies(string? imdbID)
        {
            var movie = _movieService.GetMovieDetails(imdbID);
            return Ok(movie);
        }

        [HttpPost("movies/search")]
        public IActionResult SearchMovies(SearchMovieInput searchMovie)
        {
            var movies = _movieService.SearchMovie(searchMovie);
            return Ok(movies);
        }
    }
}
