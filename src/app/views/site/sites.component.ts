import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '../../services/token/token.service';
import {ModalPaysComponent} from '../pays/modal-pays.component';
import {ListeSites} from '../../models/site/liste-sites';
import {SiteService} from '../../services/site/site.service';
import {ModalSiteComponent} from './modal-site.component';
import {Site} from '../../models/site/site';
import {ModalRemoveSiteComponent} from './modal-remove-site.component';
import {Pays} from '../../models/pays/pays';
import {PaysService} from '../../services/pays/pays.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  allSites: ListeSites;
  siteSubscription: Subscription = null;
  allPays: Array<Pays> = new Array<Pays>();
  paysSubscription: Subscription = null;

  pays: Pays = null;
  nomSite: string = '';
  codeSite: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private siteService: SiteService,
    private paysService: PaysService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchSites();
    this.getAllPays();
  }

  getAllPays() {
    this.paysSubscription = this.paysService.getAllPays().subscribe((pays) => {
      this.allPays = pays;
    });
  }

  searchNomSite() {
    this.searchSites();
  }

  searchPays(event){
    this.searchSites();
  }

  searchStatut() {
    this.searchSites();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchSites() {
    let nomPays = "";
    if(this.pays !== null){
      nomPays = this.pays.nomPays;
    }
    this.siteSubscription =  this.siteService.searchSites(this.nomSite, this.codeSite, nomPays, this.enable, this.currentPage, this.size)
      .subscribe((sites) => {
        this.allSites = sites;
        this.pages = new Array(sites.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchSites();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchSites();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchSites();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchSites();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchSites();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchSites();
  }

  reload() {
    this.currentPage = 0;
    this.searchSites();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(site: Site, type: string) {
    console.log(site);
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalSiteComponent, {class: 'modal-lg modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalSiteComponent, {class: 'modal-lg modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalSiteComponent, {class: 'modal-lg modal-default'});
    }

    (<ModalSiteComponent>this.modalRef.content).showSiteModal(
      type,
      site
    );

    (<ModalPaysComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'i' || result.type === 'u') {
        this.searchSites();
      }
    });

  }

  openRemoveModal(site: Site, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveSiteComponent, {class: 'modal-sm'});

    (<ModalRemoveSiteComponent>this.modalRef.content).showRemoveModal(
      type,
      site
    );

    (<ModalRemoveSiteComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allSites.sites[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allSites.sites[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchSites();
      }
    });

  }

  ngOnDestroy(){
    this.siteSubscription !== null ? this.siteSubscription.unsubscribe() : null;
    this.paysSubscription !== null ? this.paysSubscription.unsubscribe() : null;
  }

}
