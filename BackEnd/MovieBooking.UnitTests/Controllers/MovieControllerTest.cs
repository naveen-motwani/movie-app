using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MovieBooking.Contracts.DTO;
using MovieBooking.Contracts.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MovieBooking.UnitTests.Controllers
{
    [TestClass]
    public class MovieControllerTest
    {
        private Mock<IMovieService> _movieService;
        public MovieControllerTest()
        {
            _movieService = new Mock<IMovieService>();
        }

        [TestMethod]
        public void Should_Call_Service_Method()
        {
            var controller = GetControllerObject(_movieService.Object);

            var response = controller.GetMovies("movieId");

            _movieService.Verify(elem => elem.GetMovieDetails(It.IsAny<string>()), Times.Once);
        }

        [TestMethod]
        public void Should_Call_SearchMovie_Service_Method()
        {
            var controller = GetControllerObject(_movieService.Object);
            var searchInput = new SearchMovieInput();
            var response = controller.SearchMovies(searchInput);

            _movieService.Verify(elem => elem.SearchMovie(It.IsAny<SearchMovieInput>()), Times.Once);
        }

        private MovieBookingApi.Controllers.MoviesController GetControllerObject(IMovieService movieService)
        {
            return new MovieBookingApi.Controllers.MoviesController(movieService);
        }
    }
}
