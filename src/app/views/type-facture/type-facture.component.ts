import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ListeTypeFacture} from '../../models/type-facture/liste-type-facture';
import {TypeFactureService} from '../../services/type-facture/type-facture.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '../../services/token/token.service';
import {ModalTypeFactureComponent} from './modal-type-facture.component';
import {TypeFacture} from '../../models/type-facture/type-facture';
import {ModalRemoveTypeFactureComponent} from './modal-remove-type-facture.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-type-facture',
  templateUrl: './type-facture.component.html',
  styleUrls: ['./type-facture.component.scss']
})
export class TypeFactureComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  allTypeFacture: ListeTypeFacture;
  typeFactureSubscription: Subscription = null;
  nomTypeFacture: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private typeFactureService: TypeFactureService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchTypeFacture();
  }

  searchNomTypeFacture() {
    this.searchTypeFacture();
  }

  searchStatut() {
    this.searchTypeFacture();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchTypeFacture() {
    this.typeFactureSubscription = this.typeFactureService.searchTypeFacture(this.nomTypeFacture, this.enable, this.currentPage, this.size)
      .subscribe((typeFacture) => {
        this.allTypeFacture = typeFacture;
        this.pages = new Array(typeFacture.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchTypeFacture();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchTypeFacture();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchTypeFacture();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchTypeFacture();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchTypeFacture();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchTypeFacture();
  }

  reload() {
    this.currentPage = 0;
    this.searchTypeFacture();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(typeFacture: TypeFacture, type: string) {
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalTypeFactureComponent, {class: 'modal-md modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalTypeFactureComponent, {class: 'modal-md modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalTypeFactureComponent, {class: 'modal-md modal-default'});
    }

    (<ModalTypeFactureComponent>this.modalRef.content).showTypeFactureModal(
      type,
      typeFacture
    );

    (<ModalTypeFactureComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'i') {
        this.searchTypeFacture();
      }
      if (result.type === 'u') {
        this.searchTypeFacture();
      }
    });

  }

  openRemoveModal(typeFacture: TypeFacture, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveTypeFactureComponent, {class: 'modal-sm'});

    (<ModalRemoveTypeFactureComponent>this.modalRef.content).showRemoveModal(
      type,
      typeFacture
    );

    (<ModalRemoveTypeFactureComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allTypeFacture.typesFacture[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allTypeFacture.typesFacture[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchTypeFacture();
      }
    });

  }

  ngOnDestroy(){
    this.typeFactureSubscription !== null ? this.typeFactureSubscription.unsubscribe() : null;
  }

}
