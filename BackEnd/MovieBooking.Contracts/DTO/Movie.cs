using System;
using System.Collections.Generic;
using System.Text;

namespace MovieBooking.Contracts.DTO
{
    public class Movie
    {
        public string Language { get; set; }
        public string Location { get; set; }
        public string Plot { get; set; }
        public string Poster { get; set; }
        public string Title { get; set; }
        public string ImdbId { get; set; }
        public string ibmdRatinge { get; set; }
        public string ListingType { get; set; }
        public List<string> SoundEffects { get; set; }
        public List<string> Stills { get; set; }
    }
}
