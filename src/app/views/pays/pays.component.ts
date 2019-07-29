import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ListePays} from '../../models/pays/liste-pays';
import {PaysService} from '../../services/pays/pays.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '../../services/token/token.service';
import {ModalPaysComponent} from './modal-pays.component';
import {Pays} from '../../models/pays/pays';
import {ModalRemovePaysComponent} from './modal-remove-pays.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss']
})
export class PaysComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  allPays: ListePays;
  paysSubscription: Subscription = null;
  nomPays: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private paysService: PaysService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchPays();
  }

  searchNomPays() {
    this.searchPays();
  }

  searchStatut() {
    this.searchPays();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchPays() {
    this.paysSubscription = this.paysService.searchPays(this.nomPays, this.enable, this.currentPage, this.size)
      .subscribe((pays) => {
        this.allPays = pays;
        this.pages = new Array(pays.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchPays();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchPays();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchPays();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchPays();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchPays();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchPays();
  }

  reload() {
    this.currentPage = 0;
    this.searchPays();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(pays: Pays, type: string) {
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalPaysComponent, {class: 'modal-md modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalPaysComponent, {class: 'modal-md modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalPaysComponent, {class: 'modal-md modal-default'});
    }

    (<ModalPaysComponent>this.modalRef.content).showPaysModal(
      type,
      pays
    );

    (<ModalPaysComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'i') {
        this.searchPays();
      }
      if (result.type === 'u') {
        this.searchPays();
      }
    });

  }

  openRemoveModal(pays: Pays, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemovePaysComponent, {class: 'modal-sm'});

    (<ModalRemovePaysComponent>this.modalRef.content).showRemoveModal(
      type,
      pays
    );

    (<ModalRemovePaysComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allPays.pays[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allPays.pays[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchPays();
      }
    });

  }

  ngOnDestroy(){
    this.paysSubscription !== null ? this.paysSubscription.unsubscribe() : null;
  }

}
