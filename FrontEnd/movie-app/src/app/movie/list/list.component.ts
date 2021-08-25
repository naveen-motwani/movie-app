import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators'
import { MovieService } from '../shared/movie.service';
import { SearchResponse } from '../shared/search-response.model';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchMovieInput } from '../shared/search-input.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  searchResponse$ = new Observable<SearchResponse>(null);
  searchInput: SearchMovieInput = new SearchMovieInput();
  componentDestroy$ = new Subject();
  searchForm = new FormGroup({
    title: new FormControl(''),
    location: new FormControl(''),
    language: new FormControl(''),
  });
  constructor(private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.searchInput.pageSize = 5;
    this.searchInput.pageNumber = 0;
    this.searchInput.sortByTitle = null;
  }

  ngOnInit(): void {
    this.searchMovies();
    this.setupSubscription();
  }

  isCurrentPage(page: number): boolean {
    return this.searchInput.pageNumber == page - 1;
  }

  goToPage(page: number): void {
    if (!this.isCurrentPage(page)) {
      this.searchInput.pageNumber = page - 1;
      this.searchMovies();
    }
  }

  sort(): void {
    this.searchInput.sortByTitle = !this.searchInput.sortByTitle;
    this.searchMovies();
  }

  searchMovies(): void {
    this.searchResponse$ = this.movieService.searchMovies(this.searchInput)
      .pipe(map((searchResponse) => {
        searchResponse.records.map((movie) => {
          if (movie.listingType == "NOW_SHOWING") {
            movie.listingType = "Now Showing";
          }
          else {
            movie.listingType = "Upcoming";
          }
          return movie;
        });
        searchResponse.pages = [];
        const pages = searchResponse.totalPages / this.searchInput.pageSize;
        for (let i = 1; i <= pages; i++) {
          searchResponse.pages.push(i);
        }

        return searchResponse;
      }));;
  }

  viewDetails(id: string): void {
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  }

  private setupSubscription() {
    this.searchForm.controls.title.valueChanges.pipe(
      takeUntil(this.componentDestroy$)
    ).subscribe((value) => {
      this.searchInput.title = value;
      this.searchMovies();
    })

    this.searchForm.controls.location.valueChanges.pipe(
      takeUntil(this.componentDestroy$)
    ).subscribe((value) => {
      this.searchInput.location = value;
      this.searchMovies();
    })

    this.searchForm.controls.language.valueChanges.pipe(
      takeUntil(this.componentDestroy$)
    ).subscribe((value) => {
      this.searchInput.language = value;
      this.searchMovies();
    })
  }
}
