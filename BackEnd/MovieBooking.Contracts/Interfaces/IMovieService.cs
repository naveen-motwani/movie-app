using MovieBooking.Contracts.DTO;
using System.Collections.Generic;

namespace MovieBooking.Contracts.Interfaces
{
    public interface IMovieService
    {
        SearchResponse<Movie> SearchMovie(SearchMovieInput searchMovie);

        Movie GetMovieDetails(string imdbId);
    }
}
