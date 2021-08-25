import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../shared/movie.model';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  movie$: Observable<Movie>;
  id: string;
  constructor(private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.getMovieDetail();
    }
  }

  getMovieDetail() {
    this.movie$ = this.movieService.getMovie(this.id).pipe(map((movie) => {
      if (movie.listingType == "NOW_SHOWING") {
        movie.listingType = "Now Showing";
      }
      else {
        movie.listingType = "Upcoming";
      }
      return movie;
    }));
  }

  goBack(): void {
    this.route.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
