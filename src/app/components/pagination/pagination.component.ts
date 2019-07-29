import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() pages: Array<number>;
  @Input() nombreElements: number;
  @Input() totalElements: number;
  @Input() totalPages: number;
  @Input() currentPage: number;
  @Input() size: number;
  @Input() page: number;
  @Output() search = new EventEmitter<number>();
  @Output() limit = new EventEmitter<number>();
  @Output() first = new EventEmitter<number>();
  @Output() previous = new EventEmitter<number>();
  @Output() next = new EventEmitter<number>();
  @Output() last = new EventEmitter<number>();

  debut: number;
  fin: number;
  taille: number;

  constructor() {
  }

  ngOnInit() {
    if(this.totalPages === 0){
      this.debut = 0;
      this.page = 0;
    }else{
      this.debut = 1;
    }
    this.fin = this.nombreElements;
    this.taille = this.size;
  }

  ngOnChanges() {
    if (this.currentPage === 0) {
      if(this.totalPages === 0){
        this.debut = 0;
      }else{
        this.debut = 1;
      }
      if(this.size < this.totalElements){
        this.fin = this.size;
      }else{
        this.fin = this.totalElements;
      }
    }
  }

  searchPage(page: number) {
    if (page < 1) {
      page = 1;
      this.page = page;
    }
    this.currentPage = this.page - 1;
    if (this.currentPage > 0) {
      let r = this.totalElements % this.size;
      let q = Math.round((this.totalElements / this.size));
      console.log(q);
      console.log(r);
      this.fin = q * this.size;
      if (this.fin > this.totalElements) this.fin = this.totalElements;
      console.log(this.fin);
      console.log(this.debut);
      console.log(this.size);
      if (q === page - 1){
        this.fin += r;
        this.debut = this.fin - r + 1;
      } else{
        this.debut = this.fin - this.size + 1;
      }
    } else {
      this.fin = this.size;
    }
    this.search.emit(this.currentPage);
  }

  searchLimit(limit: number) {
    console.log(this.page);
    if (limit < 10) limit = 10;
    if (limit > this.totalElements) {
      if(this.totalElements < 10){
        limit = 10;
      }else{
        limit = this.totalElements;
      }
    }
    if (this.currentPage > 0) {
      let r = this.totalElements % parseInt(limit.toString());
      let q = Math.round((this.totalElements / parseInt(limit.toString())));
      console.log(q);
      console.log(r);
      console.log(limit);
      if (q >= this.page) {
        this.fin = q * parseInt(limit.toString());
        if (this.fin > this.totalElements) this.fin = this.totalElements;
        console.log(this.fin);
        console.log(this.debut);
        console.log(this.size);
        if ((this.fin - this.debut) <= parseInt(limit.toString())) {
          console.log(limit);
          this.debut = parseInt(limit.toString()) + 1;
        } else {
          console.log(limit);
          this.debut = this.fin - parseInt(limit.toString()) + 1;
        }
      } else {
        this.fin += r;
        if (this.fin > this.totalElements) this.fin = this.totalElements;
        if ((this.fin - this.debut) <= parseInt(limit.toString())) {
          this.debut = parseInt(limit.toString()) + 1;
          if (this.debut > this.totalElements) {
            this.page -= 1;
            //this.totalPages -= 1;
            this.searchPage(this.page);
          }
        } else {
          this.debut = this.fin - parseInt(limit.toString());
        }
      }
    } else {
      this.fin = parseInt(limit.toString());
    }
    this.taille = parseInt(limit.toString());
    this.size = parseInt(limit.toString());
    this.limit.emit(this.size);
  }

  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage += 1;
      this.debut += this.nombreElements;
      let q = Math.trunc(this.totalElements / (this.currentPage + 1));
      if (q > 10) {
        this.fin = q * (this.currentPage + 1) - (this.currentPage + 1);
      } else {
        this.fin = this.totalElements;
      }
      if (this.currentPage === this.pages.length - 1) this.fin = this.totalElements;
      console.log(this.currentPage);
      console.log(this.pages.length);
      this.page += 1;
      this.next.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
      this.debut -= this.size;
      this.fin -= this.nombreElements;
      this.page -= 1;
      this.previous.emit(this.currentPage);
    }
  }

  firstPage() {
    if (this.currentPage > 0) {
      this.currentPage = 0;
      this.debut = 1;
      this.fin = this.size;
      this.page = 1;
      this.first.emit(this.currentPage);
    }
  }

  lastPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage = this.totalPages - 1;
      let r = this.totalElements % this.size;
      if (r === 0) {
        this.debut = this.totalElements - this.nombreElements + 1;
      } else {
        this.debut = this.totalElements - r + 1;
      }
      this.fin = this.totalElements;
      this.page = this.totalPages;
      this.last.emit(this.currentPage);
    }
  }

}
