import { Movie } from "./movie.model";

export class SearchResponse {
    records: Array<Movie>;
    totalPages: number;
    pages: Array<number>;
}