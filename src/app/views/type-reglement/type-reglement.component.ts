import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ListeTypeReglement} from '../../models/type-reglement/liste-type-reglement';
import {TypeReglementService} from '../../services/type-reglement/type-reglement.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '../../services/token/token.service';
import {ModalTypeReglementComponent} from './modal-type-reglement.component';
import {TypeReglement} from '../../models/type-reglement/type-reglement';
import {ModalRemoveTypeReglementComponent} from './modal-remove-type-reglement.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-type-reglement',
  templateUrl: './type-reglement.component.html',
  styleUrls: ['./type-reglement.component.scss']
})
export class TypeReglementComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  allTypeReglement: ListeTypeReglement;
  typeReglementSubscription: Subscription = null;
  nomTypeReglement: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private typeReglementService: TypeReglementService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchTypeReglement();
  }

  searchNomTypeReglement() {
    this.searchTypeReglement();
  }

  searchStatut() {
    this.searchTypeReglement();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchTypeReglement() {
    this.typeReglementSubscription = this.typeReglementService.searchTypeReglement(this.nomTypeReglement, this.enable, this.currentPage, this.size)
      .subscribe((typeReglement) => {
        this.allTypeReglement = typeReglement;
        this.pages = new Array(typeReglement.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchTypeReglement();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchTypeReglement();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchTypeReglement();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchTypeReglement();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchTypeReglement();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchTypeReglement();
  }

  reload() {
    this.currentPage = 0;
    this.searchTypeReglement();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(typeReglement: TypeReglement, type: string) {
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalTypeReglementComponent, {class: 'modal-md modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalTypeReglementComponent, {class: 'modal-md modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalTypeReglementComponent, {class: 'modal-md modal-default'});
    }

    (<ModalTypeReglementComponent>this.modalRef.content).showTypeReglementModal(
      type,
      typeReglement
    );

    (<ModalTypeReglementComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'i') {
        this.searchTypeReglement();
      }
      if (result.type === 'u') {
        this.searchTypeReglement();
      }
    });

  }

  openRemoveModal(typeReglement: TypeReglement, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveTypeReglementComponent, {class: 'modal-sm'});

    (<ModalRemoveTypeReglementComponent>this.modalRef.content).showRemoveModal(
      type,
      typeReglement
    );

    (<ModalRemoveTypeReglementComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allTypeReglement.typesReglement[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allTypeReglement.typesReglement[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchTypeReglement();
      }
    });

  }

  ngOnDestroy(){
    this.typeReglementSubscription !== null ? this.typeReglementSubscription.unsubscribe() : null;
  }

}
