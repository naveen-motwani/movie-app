import { Movie } from "./movie.model";

export class SearchResponse {
    records: Array<Movie>;
    totalRecords: number;
}