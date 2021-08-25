using System;
using System.Collections.Generic;
using System.Text;

namespace MovieBooking.Contracts.DTO
{
    public class SearchMovieInput
    {
        public string Title { get; set; }
        public string Location { get; set; }
        public string Language { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public bool SortByTitle { get; set; }
    }
}
