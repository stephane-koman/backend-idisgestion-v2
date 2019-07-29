import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ListeDevise} from '../../models/devise/liste-devise';
import {DeviseService} from '../../services/devise/devise.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '../../services/token/token.service';
import {ModalDeviseComponent} from './modal-devise.component';
import {Devise} from '../../models/devise/devise';
import {ModalRemoveDeviseComponent} from './modal-remove-devise.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-devise',
  templateUrl: './devise.component.html',
  styleUrls: ['./devise.component.scss']
})
export class DeviseComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  allDevises: ListeDevise;
  deviseSubscription: Subscription = null;
  nomDevise: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private deviseService: DeviseService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchDevise();
  }

  searchNomDevise() {
    this.searchDevise();
  }

  searchStatut() {
    this.searchDevise();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchDevise() {
    this.deviseSubscription = this.deviseService.searchDevises(this.nomDevise, this.enable, this.currentPage, this.size)
      .subscribe((devises) => {
        this.allDevises = devises;
        this.pages = new Array(devises.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchDevise();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchDevise();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchDevise();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchDevise();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchDevise();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchDevise();
  }

  reload() {
    this.currentPage = 0;
    this.searchDevise();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(devise: Devise, type: string) {
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalDeviseComponent, {class: 'modal-md modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalDeviseComponent, {class: 'modal-md modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalDeviseComponent, {class: 'modal-md modal-default'});
    }

    (<ModalDeviseComponent>this.modalRef.content).showDeviseModal(
      type,
      devise
    );

    (<ModalDeviseComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'i') {
        this.searchDevise();
      }
      if (result.type === 'u') {
        this.searchDevise();
      }
    });

  }

  openRemoveModal(devise: Devise, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveDeviseComponent, {class: 'modal-sm'});

    (<ModalRemoveDeviseComponent>this.modalRef.content).showRemoveModal(
      type,
      devise
    );

    (<ModalRemoveDeviseComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allDevises.devises[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allDevises.devises[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchDevise();
      }
    });

  }

  ngOnDestroy(){
    this.deviseSubscription !== null ? this.deviseSubscription.unsubscribe() : null;
  }

}
