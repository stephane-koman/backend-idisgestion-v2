import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ListeTva} from '../../models/tva/liste-tva';
import {TvaService} from '../../services/tva/tva.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '../../services/token/token.service';
import {ModalTvaComponent} from './modal-tva.component';
import {Tva} from '../../models/tva/tva';
import {ModalRemoveTvaComponent} from './modal-remove-tva.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tva',
  templateUrl: './tva.component.html',
  styleUrls: ['./tva.component.scss']
})
export class TvaComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  allTvas: ListeTva;
  tvaSubscription: Subscription = null;
  valeurTva: number = null;
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private tvaService: TvaService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchTva();
  }

  searchValeurTva() {
    this.searchTva();
  }

  searchStatut() {
    this.searchTva();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchTva() {
    this.tvaSubscription = this.tvaService.searchTvas(this.valeurTva, this.enable, this.currentPage, this.size)
      .subscribe((tvas) => {
        this.allTvas = tvas;
        this.pages = new Array(tvas.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchTva();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchTva();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchTva();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchTva();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchTva();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchTva();
  }

  reload() {
    this.currentPage = 0;
    this.searchTva();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(tva: Tva, type: string) {
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalTvaComponent, {class: 'modal-md modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalTvaComponent, {class: 'modal-md modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalTvaComponent, {class: 'modal-md modal-default'});
    }

    (<ModalTvaComponent>this.modalRef.content).showTvaModal(
      type,
      tva
    );

    (<ModalTvaComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'i') {
        this.searchTva();
      }
      if (result.type === 'u') {
        this.searchTva();
      }
    });

  }

  openRemoveModal(tva: Tva, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveTvaComponent, {class: 'modal-sm'});

    (<ModalRemoveTvaComponent>this.modalRef.content).showRemoveModal(
      type,
      tva
    );

    (<ModalRemoveTvaComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allTvas.tvas[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allTvas.tvas[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchTva();
      }
    });

  }

  ngOnDestroy(){
    this.tvaSubscription !== null ? this.tvaSubscription.unsubscribe() : null;
  }

}
