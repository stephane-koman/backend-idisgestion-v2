import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ListeDomaineActivite} from '../../models/domaine-activite/liste-domaine-activite';
import {DomaineActiviteService} from '../../services/domaine-activite/domaine-activite.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '../../services/token/token.service';
import {ModalDomaineActiviteComponent} from './modal-domaine-activite.component';
import {DomaineActivite} from '../../models/domaine-activite/domaine-activite';
import {ModalRemoveDomaineActiviteComponent} from './modal-remove-domaine-activite.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-domaine-activite',
  templateUrl: './domaine-activite.component.html',
  styleUrls: ['./domaine-activite.component.scss']
})
export class DomaineActiviteComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  allDomainesActivite: ListeDomaineActivite;
  domaineActiviteSubscription: Subscription = null;
  code: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private domaineActiviteService: DomaineActiviteService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchDomaineActivite();
  }

  searchCode() {
    this.searchDomaineActivite();
  }

  searchStatut() {
    this.searchDomaineActivite();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchDomaineActivite() {
    this.domaineActiviteSubscription = this.domaineActiviteService.searchDomaineActivite(this.code, this.enable, this.currentPage, this.size)
      .subscribe((domainesActivite) => {
        this.allDomainesActivite = domainesActivite;
        this.pages = new Array(domainesActivite.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchDomaineActivite();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchDomaineActivite();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchDomaineActivite();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchDomaineActivite();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchDomaineActivite();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchDomaineActivite();
  }

  reload() {
    this.currentPage = 0;
    this.searchDomaineActivite();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(domaineActivite: DomaineActivite, type: string) {
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalDomaineActiviteComponent, {class: 'modal-md modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalDomaineActiviteComponent, {class: 'modal-md modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalDomaineActiviteComponent, {class: 'modal-md modal-default'});
    }

    (<ModalDomaineActiviteComponent>this.modalRef.content).showDomaineActiviteModal(
      type,
      domaineActivite
    );

    (<ModalDomaineActiviteComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'i') {
        this.searchDomaineActivite();
      }
      if (result.type === 'u') {
        this.searchDomaineActivite();
      }
    });

  }

  openRemoveModal(domaineActivite: DomaineActivite, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveDomaineActiviteComponent, {class: 'modal-sm'});

    (<ModalRemoveDomaineActiviteComponent>this.modalRef.content).showRemoveModal(
      type,
      domaineActivite
    );

    (<ModalRemoveDomaineActiviteComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allDomainesActivite.domainesActivite[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allDomainesActivite.domainesActivite[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchDomaineActivite();
      }
    });

  }

  ngOnDestroy(){
    this.domaineActiviteSubscription !== null ? this.domaineActiviteSubscription.unsubscribe() : null;
  }

}
