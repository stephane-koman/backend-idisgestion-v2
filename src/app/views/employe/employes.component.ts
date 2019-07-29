import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {EmployeService} from '../../services/employe/employe.service';
import {FormBuilder} from '@angular/forms';
import {ModalEmployeComponent} from './modal-employe.component';
import {ModalRemoveEmployeComponent} from './modal-remove-employe.component';
import {ListeEmployes} from '../../models/employe/liste-employes';
import {BsModalService} from 'ngx-bootstrap/modal';
import {TokenService} from '../../services/token/token.service';
import {ModalSiteComponent} from '../site/modal-site.component';
import {SiteService} from '../../services/site/site.service';
import {Site} from '../../models/site/site';
import {Employe} from '../../models/employe/employe';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss']
})
export class EmployesComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  allEmployes: ListeEmployes;
  employeSubscription: Subscription = null;
  siteSubscription: Subscription = null;
  allSites: Array<Site> = new Array<Site>();
  site: Site = null;
  matricule: string = '';
  raisonSociale: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private employeService: EmployeService,
    private siteService: SiteService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchEmployes();
    this.getAllSite();
  }

  getAllSite() {
    this.siteSubscription = this.siteService.getAllSites().subscribe((site) => {
      this.allSites = site;
    });
  }

  searchMatricule() {
    this.searchEmployes();
  }

  searchSite(){
    this.searchEmployes();
  }

  searchRaisonSociale() {
    this.searchEmployes();
  }

  searchStatut() {
    this.searchEmployes();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchEmployes() {
    let nomSite = "";
    if(this.site !== null){
      nomSite = this.site.nomSite;
    }
     this.employeSubscription = this.employeService.searchEmployes(this.matricule, nomSite, this.raisonSociale, this.enable, this.currentPage, this.size)
      .subscribe((employes: ListeEmployes) => {
        this.allEmployes = employes;
        this.pages = new Array(employes.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchEmployes();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchEmployes();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchEmployes();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchEmployes();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchEmployes();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchEmployes();
  }

  reload() {
    this.currentPage = 0;
    this.searchEmployes();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(employe: Employe, type: string) {
    console.log(employe);
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalEmployeComponent, {class: 'modal-lg modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalEmployeComponent, {class: 'modal-lg modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalEmployeComponent, {class: 'modal-lg modal-default'});
    }

    (<ModalEmployeComponent>this.modalRef.content).showEmployeModal(
      type,
      employe
    );

    (<ModalSiteComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'i' || result.type === 'u') {
        this.searchEmployes();
      }
    });

  }

  openRemoveModal(employe: Employe, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveEmployeComponent, {class: 'modal-sm'});

    (<ModalRemoveEmployeComponent>this.modalRef.content).showRemoveModal(
      type,
      employe
    );

    (<ModalRemoveEmployeComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allEmployes.employes[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allEmployes.employes[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchEmployes();
      }
    });

  }

  ngOnDestroy(){
    this.employeSubscription !== null ? this.employeSubscription.unsubscribe() : null;
    this.siteSubscription !== null ? this.siteSubscription.unsubscribe() : null;
  }

}
