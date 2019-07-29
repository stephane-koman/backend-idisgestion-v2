import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FonctionService} from '../../services/fonction/fonction.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '../../services/token/token.service';
import {ModalFonctionComponent} from './modal-fonction.component';
import {Fonction} from '../../models/fonction/fonction';
import {ModalRemoveFonctionComponent} from './modal-remove-fonction.component';
import {ListeFonctions} from '../../models/fonction/liste-fonctions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.scss']
})
export class FonctionComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  allFonctions: ListeFonctions;
  fonctionSubscription: Subscription = null;
  nomFonction: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private fonctionService: FonctionService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchFonction();
  }

  searchNomFonction() {
    this.searchFonction();
  }

  searchStatut() {
    this.searchFonction();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchFonction() {
    this.fonctionSubscription = this.fonctionService.searchFonction(this.nomFonction, this.enable, this.currentPage, this.size)
      .subscribe((fonction) => {
        this.allFonctions = fonction;
        this.pages = new Array(fonction.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchFonction();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchFonction();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchFonction();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchFonction();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchFonction();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchFonction();
  }

  reload() {
    this.currentPage = 0;
    this.searchFonction();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(fonction: Fonction, type: string) {
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalFonctionComponent, {class: 'modal-md modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalFonctionComponent, {class: 'modal-md modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalFonctionComponent, {class: 'modal-md modal-default'});
    }

    (<ModalFonctionComponent>this.modalRef.content).showFonctionModal(
      type,
      fonction
    );

    (<ModalFonctionComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'i') {
        this.searchFonction();
      }
      if (result.type === 'u') {
        this.searchFonction();
      }
    });

  }

  openRemoveModal(fonction: Fonction, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveFonctionComponent, {class: 'modal-sm'});

    (<ModalRemoveFonctionComponent>this.modalRef.content).showRemoveModal(
      type,
      fonction
    );

    (<ModalRemoveFonctionComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allFonctions.fonctions[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allFonctions.fonctions[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchFonction();
      }
    });

  }

  ngOnDestroy(){
    this.fonctionSubscription !== null ? this.fonctionSubscription.unsubscribe() : null;
  }

}
