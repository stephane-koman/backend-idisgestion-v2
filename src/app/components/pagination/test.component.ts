import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalElements: number;
  @Input() totalPages: number;
  @Input() currentPage: number;
  @Input() size: number;
  @Output() search = new EventEmitter<number>();
  @Output() limit = new EventEmitter<number>();
  @Output() first = new EventEmitter<number>();
  @Output() previous = new EventEmitter<number>();
  @Output() next = new EventEmitter<number>();
  @Output() last = new EventEmitter<number>();

  debut: number;
  fin: number;

  constructor() {
  }

  ngOnInit() {
    if (this.totalPages && this.totalPages > 0) {
      this.debut = 1;
    } else {
      this.debut = 0;
    }
    console.log("bonjour");
    
    this.totalElements < this.size ? this.fin = this.totalElements : this.fin = this.size;
  }

  ngOnChanges() {
    if(this.currentPage === 1){
      this.totalElements < this.size ? this.fin = this.totalElements : this.fin = this.size;
    }
  }

  searchPage(page: number) {

    if (page <= 1) {
      this.currentPage = 2;
      this.firstPage();
    } else {

      this.currentPage = page;

      if (this.currentPage > 1 && this.currentPage < this.totalPages) {

        let q = Math.trunc(this.totalElements / this.currentPage);
        let r = this.totalElements % this.size;

        if (q >= this.size) {
          this.debut = this.currentPage * this.size - this.size + 1;
          this.fin = this.debut + this.size - 1;
        } else {
          this.fin = this.totalElements;
          this.debut = this.fin - r + 1;
        }

        this.next.emit(this.currentPage);
      } else {
        this.currentPage = 0;
        this.lastPage();
      }
    }

  }

  searchLimit(limit: number) {
    if (limit < 1) limit = 10;

    this.currentPage = 1;
    this.debut = 1;
    this.totalElements > this.size ? this.fin = this.size : this.fin = this.totalElements;

    this.limit.emit(this.size);

  }

  nextPage() {

    if (this.currentPage < this.totalPages) {

      this.currentPage += 1;

      let q = Math.trunc(this.totalElements / this.currentPage);
      let r = this.totalElements % this.size;

      if (q >= this.size) {
        this.debut = this.currentPage * this.size - this.size + 1;
        this.fin = this.debut + this.size - 1;
      } else {
        this.fin = this.totalElements;
        this.debut = this.fin - r + 1;
      }

      this.next.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {

      this.currentPage -= 1;

      let q = Math.trunc(this.totalElements / this.currentPage);
      let r = this.totalElements % this.size;

      if (q >= this.size) {
        this.debut = this.currentPage * this.size - this.size + 1;
        this.fin = this.debut + this.size - 1;
      } else {
        this.fin = this.totalElements;
        this.debut = this.fin - r + 1;
      }

      this.previous.emit(this.currentPage);
    }
  }

  firstPage() {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.debut = 1;
      this.totalElements > this.size ? this.fin = this.size : this.fin = this.totalElements;
      this.first.emit(this.currentPage);
    }
  }

  lastPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;

      let r = this.totalElements % this.size;

      this.fin = this.totalElements;
      this.debut = this.fin - r + 1;

      this.last.emit(this.currentPage);
    }
  }

}
