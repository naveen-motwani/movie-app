import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { MovieComponent } from './movie.component';
import { MovieRoutingModule } from './movie-routing.module';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    MovieComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
  ]
})
export class MovieModule { }
