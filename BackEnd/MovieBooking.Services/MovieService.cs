
using MovieBooking.Contracts.DTO;
using MovieBooking.Contracts.Interfaces;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Linq;
using MovieBooking.Contracts;

namespace MovieBooking.Services
{
    public class MovieService : IMovieService
    {
        private static List<Movie> movies = LoadMovies();
        private readonly int defaultPageSize = 10;
       
        /// <summary>
        /// To get the movie detail based on imdbId
        /// </summary>
        /// <param name="imdbId"></param>
        /// <returns></returns>
        public Movie GetMovieDetails(string imdbId)
        {
            return movies.FirstOrDefault(elem => elem.ImdbId == imdbId);
        }


        /// <summary>
        /// To search movies based on input
        /// </summary>
        /// <param name="searchMovie"></param>
        /// <returns> paginated response </returns>
        public SearchResponse<Movie> SearchMovie(SearchMovieInput searchMovie)
        {
            if (searchMovie == null)
            {
                throw new System.ArgumentNullException("Bad Request");
            }

            SearchResponse<Movie> response = null;
            IEnumerable<Movie> movieQuery = movies.AsEnumerable();

            #region search logic
            if (!string.IsNullOrWhiteSpace(searchMovie.Language))
            {
                movieQuery = movies.Where(elem => elem.Language == searchMovie.Language);
            }

            if (!string.IsNullOrWhiteSpace(searchMovie.Location))
            {
                movieQuery = movies.Where(elem => elem.Location == searchMovie.Location);
            }
            if (searchMovie.PageSize == 0)
            {
                searchMovie.PageSize = Constants.Default_Page_Size;
            }
            #endregion

            #region pagination logic
            var skip = searchMovie.PageNumber * searchMovie.PageSize;
            var take = searchMovie.PageSize;
            var filteredMovies = movieQuery.Skip(skip).Take(take).ToList();
            #endregion

            var totalRecords = movies.Count();
            response = new SearchResponse<Movie>(filteredMovies, totalRecords);

            return response;
        }


        /// <summary>
        /// load the movies from json file.
        /// </summary>
        /// <returns></returns>
        private static List<Movie> LoadMovies()
        {
            List<Movie> movies = null;
            string path = Path.Combine(Path.GetFileName("movies.json"));
            using (StreamReader r = new StreamReader(path))
            {
                string json = r.ReadToEnd();
                var movieString = JObject.Parse(json)["movies"].ToString();
                movies = JsonConvert.DeserializeObject<List<Movie>>(movieString);
            }

            return movies;
        }
    }
}
