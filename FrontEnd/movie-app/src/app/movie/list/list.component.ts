import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
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
  }

  ngOnInit(): void {
    this.searchMovies();
    this.setupSubscription();
  }

  searchMovies(): void {
    this.searchResponse$ = this.movieService.searchMovies(this.searchInput);
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
