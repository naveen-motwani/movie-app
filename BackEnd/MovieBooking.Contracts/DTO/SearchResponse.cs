using System;
using System.Collections.Generic;
using System.Text;

namespace MovieBooking.Contracts.DTO
{
    public class SearchResponse<T> where T : class
    {
        public SearchResponse(List<T> records, int count)
        {
            TotalPages = count;
            Records = records;
        }

        public int TotalPages { get; set; }
        public List<T> Records { get; set; }
    }
}
