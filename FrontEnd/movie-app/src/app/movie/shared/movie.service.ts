import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "./movie.model";
import { SearchMovieInput } from "./search-input.model";
import { SearchResponse } from "./search-response.model";

@Injectable()
export class MovieService {
    private baseUrl = 'http://localhost:59968/movies'
    constructor(private httpClient: HttpClient) {
    }

    searchMovies(searchInput: SearchMovieInput): Observable<SearchResponse> {
        const uri = `${this.baseUrl}/search`
        const httpOptions = this.getDefaultHeaders();
        return this.httpClient.post<SearchResponse>(uri, searchInput, httpOptions);
    }

    getMovie(id: string): Observable<Movie> {
        const uri = `${this.baseUrl}/${id}`
        const httpOptions = this.getDefaultHeaders();
        return this.httpClient.get<Movie>(uri, httpOptions);
    }

    private getDefaultHeaders() {
        const httpOptions = {
            headers: new HttpHeaders({
                'content-type': 'application/json; charset=utf-8'
            })
        };
        return httpOptions;
    }
}