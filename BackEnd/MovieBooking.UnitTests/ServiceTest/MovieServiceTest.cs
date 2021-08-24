using Microsoft.VisualStudio.TestTools.UnitTesting;
using MovieBooking.Contracts.DTO;
using MovieBooking.Services;

namespace MovieBooking.UnitTests
{
    [TestClass]
    public class MovieServiceTest
    {
        [TestMethod]
        public void Should_Return_Record_If_ID_Matches()
        {
            var service = GetServiceObject();

            var response = service.GetMovieDetails("tt0295297");

            Assert.IsNotNull(response);
            Assert.AreEqual(response.ImdbId, "tt0295297");
        }

        #region SearchMovieAsync
        [TestMethod]
        public void Should_Throw_Exception_Incase_of_Invalid_Input()
        {
            var service = GetServiceObject();

            Assert.ThrowsException<System.ArgumentNullException>(() => service.SearchMovie(null));
        }

        [TestMethod]
        public void Should_Not_Return_All_Records_But_Paginated_Records()
        {
            var service = GetServiceObject();
            var searchParameters = new SearchMovieInput();
            searchParameters.PageSize = 5;

            var response = service.SearchMovie(searchParameters);

            Assert.IsNotNull(response);
            Assert.AreNotEqual(response.TotalPages, searchParameters.PageSize);
            Assert.AreEqual(response.Records.Count, searchParameters.PageSize);
        }

        [TestMethod]
        public void Should_Return_Default_PageSize_Records_If_Page_Size_Not_Provided()
        {
            var service = GetServiceObject();
            var searchParameters = new SearchMovieInput();

            var response = service.SearchMovie(searchParameters);

            Assert.IsNotNull(response);
            Assert.AreEqual(response.Records.Count, Contracts.Constants.Default_Page_Size);
        }

        [TestMethod]
        public void Should_Return_Records_Based_Location()
        {
            var service = GetServiceObject();
            var searchParameters = new SearchMovieInput();
            searchParameters.Location = "Pune";

            var response = service.SearchMovie(searchParameters);

            for (int i = 0; i < response.Records.Count; i++)
            {
                Assert.AreEqual(response.Records[i].Location, "Pune");
            }
        }

        [TestMethod]
        public void Should_Return_Records_Based_Language()
        {
            var service = GetServiceObject();
            var searchParameters = new SearchMovieInput();
            searchParameters.Language = "Hindi";

            var response = service.SearchMovie(searchParameters);

            for (int i = 0; i < response.Records.Count; i++)
            {
                Assert.AreEqual(response.Records[i].Language, "Hindi");
            }
        } 
        #endregion

        private MovieService GetServiceObject()
        {
            return new MovieService();
        }
    }
}
