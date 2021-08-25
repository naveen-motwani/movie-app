import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { MovieComponent } from './movie.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from './shared/movie.service';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    MovieComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MovieRoutingModule,
    // MatTableModule,
    // MatButtonModule,
    // MatIconModule,
    // MatCardModule,
    // MatFormFieldModule,
    // MatButtonModule,
  ],
  providers: [
    MovieService,
  ]
})
export class MovieModule { }
