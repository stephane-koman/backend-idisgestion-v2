import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationComponent} from './pagination.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ PaginationComponent ],
  declarations: [PaginationComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PaginationModule { }
