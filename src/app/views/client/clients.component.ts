import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListeClients} from '../../models/client/liste-clients';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {TokenService} from '../../services/token/token.service';
import {ModalClientComponent} from './modal-client.component';
import {ModalRemoveClientComponent} from './modal-remove-client.component';
import {ClientService} from '../../services/client/client.service';
import {Client} from '../../models/client/client';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  allClients: ListeClients;
  clientSubscription: Subscription = null;

  codeClient: string = '';
  raisonSociale: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private clientService: ClientService,
    private tokenService: TokenService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchClients();
  }

  searchCodeClient() {
    this.searchClients();
  }

  searchRaisonSociale() {
    this.searchClients();
  }

  searchStatut() {
    this.searchClients();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchClients() {
    this.clientSubscription = this.clientService.searchClients(this.codeClient, this.raisonSociale, this.enable, this.currentPage, this.size)
      .subscribe((clients) => {
        this.allClients = clients;
        this.pages = new Array(clients.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchClients();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchClients();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchClients();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchClients();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchClients();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchClients();
  }

  reload() {
    this.currentPage = 0;
    this.searchClients();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(client: Client, type: string) {
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalClientComponent, {class: 'modal-md modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalClientComponent, {class: 'modal-md modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalClientComponent, {class: 'modal-md modal-default'});
    }

    (<ModalClientComponent>this.modalRef.content).showClientModal(
      type,
      client
    );

    (<ModalClientComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'i') {
        this.searchClients();
      }
      if (result.type === 'u') {
        this.searchClients();
      }
    });

  }

  openRemoveModal(client: Client, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveClientComponent, {class: 'modal-sm'});

    (<ModalRemoveClientComponent>this.modalRef.content).showRemoveModal(
      type,
      client
    );

    (<ModalRemoveClientComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allClients.clients[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allClients.clients[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchClients();
      }
    });

  }

  ngOnDestroy(){
    this.clientSubscription !== null ? this.clientSubscription.unsubscribe() : null;
  }

}
