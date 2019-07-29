import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {SiteService} from '../../services/site/site.service';
import {SuiviColisComponent} from './suivi-colis.component';
import {TabDirective} from 'ngx-bootstrap/tabs';
import {Subject} from 'rxjs';
import {TokenService} from '../../services/token/token.service';
import {ListeColis} from '../../models/colis/liste-colis';
import {Site} from '../../models/site/site';
import {ColisService} from '../../services/colis/colis.service';
import {DetailsColis} from '../../models/colis/details-colis';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Colis} from '../../models/colis/colis';
import {ClientService} from '../../services/client/client.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Client} from '../../models/client/client';
import {TabsetComponent} from 'ngx-bootstrap';
import {ModalRemoveColisComponent} from './modal-remove-colis.component';
import {Subscription} from 'rxjs';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-colis-receive',
  templateUrl: './colis-receive.component.html',
  styleUrls: ['./colis-receive.component.scss']
})
export class ColisReceiveComponent implements OnInit {
  @ViewChild('staticTabs', {static: false}) staticTabs: TabsetComponent;

  modalRef: BsModalRef;

  //---------------------------- START COLIS FORM -------------------------------

  public type: string;
  colis: Colis = new Colis();
  colisForm: FormGroup;
  //detailsColis: FormArray = new FormArray([]);
  public onClose: Subject<any>;
  isLoading: boolean = false;
  allClients: Array<Client> = new Array<Client>();
  allSites: Array<Site> = new Array<Site>();
  user: Utilisateur = new Utilisateur();

  //---------------------------- END COLIS FORM -------------------------------


  allColis: ListeColis;
  colisSubscription: Subscription = null;

  reference: string = '';
  nomClient: string = '';
  nomDestinataire: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(private colisService: ColisService,
              private clientService: ClientService,
              private siteService: SiteService,
              private userService: UtilisateurService,
              private tokenService: TokenService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private modalService: BsModalService
  ) {
  }

  ngOnInit() {
    this.type = "i";
    this.receiveSearchColis();
    this.getAllClients();
    this.getAllSites();
    this.getProfile();
    this.createColis();
    console.log(this.colisForm);
  }

  onSelect(tab: TabDirective): void {
    if(tab.id === 'liste-colis'){
      this.type = 'i';
      this.colisForm.enable();
      this.clearColisForm();
    }
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  clearColisForm() {
    this.clearFormArray(this.detailsColis);
    this.addDetailsColis();
    this.colisForm.reset({
      id: '',
      reference: '',
      qrCode: '',
      valeurColis: '',
      description: '',
      nomDestinataire: '',
      contactDestinataire: '',
      adresseDestinataire: '',
      client: null,
      siteDestinataire: null,
      detailsColis: new FormArray([])
    });
    this.colis = new Colis();
  }

  clearSearchColis() {
    this.reference = '';
    this.nomDestinataire = '';
    this.nomClient = '';
    this.currentPage = 0;
    this.receiveSearchColis();
  }

  selectTab(tab_id: number) {
    if(this.staticTabs.tabs[tab_id]){
      this.staticTabs.tabs[tab_id].active = true;
    }
  }

  searchReference() {
    this.receiveSearchColis();
  }

  searchNomClient() {
    this.receiveSearchColis();
  }

  searchNomDestinataire() {
    this.receiveSearchColis();
  }

  searchStatut() {
    this.receiveSearchColis();
  }

  // ---------------------------------- START API REQUEST-----------------------------------------------------
  receiveSearchColis() {
    this.colisSubscription = this.colisService.receiveSearchColis(this.reference, this.nomClient, this.nomDestinataire, this.enable, this.currentPage, this.size)
      .subscribe((colis) => {
        this.allColis = colis;
        this.pages = new Array(colis.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  getAllClients() {
    this.clientService.getAllClients()
      .subscribe((clients) => {
        this.allClients = clients;
      })
  }

  getAllSites() {
    this.siteService.getAllSitesColis().subscribe((sites) => {
      this.allSites = sites;
    });
  }

  getProfile() {
    this.userService.getProfile().subscribe((user) => {
      this.user = user;
    });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.receiveSearchColis();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.receiveSearchColis();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.receiveSearchColis();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.receiveSearchColis();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.receiveSearchColis();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.receiveSearchColis();
  }

  reload() {
    this.currentPage = 0;
    this.receiveSearchColis();
  }

  // ---------------------------- START FORM COLIS --------------------------------------------

  createColis() {
    this.colisForm = this.fb.group({
      id: [this.colis.id],
      reference: [this.colis.reference],
      qrCode: [this.colis.qrCode],
      valeurColis: [this.colis.valeurColis, Validators.required],
      description: [this.colis.description, Validators.required],
      nomDestinataire: [this.colis.nomDestinataire, Validators.required],
      contactDestinataire: [this.colis.contactDestinataire, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('[0-9 ]*')])],
      adresseDestinataire: [this.colis.adresseDestinataire, Validators.required],
      client: [this.colis.client, Validators.required],
      siteDestinataire: [this.colis.siteDestinataire, Validators.required],
      detailsColis: this.fb.array([this.createDetailsColis()])
    });
  }

  createDetailsColis(): FormGroup {
    return this.fb.group({
      id: [''],
      quantite: ['', Validators.required],
      poids: ['', Validators.required],
      designation: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addDetailsColis(): void {
    this.detailsColis.push(this.createDetailsColis());
  }

  get detailsColis(): FormArray {
    return this.colisForm.get('detailsColis') as FormArray;
  };

  deleteDetail(index) {
    this.detailsColis.controls.splice(index, 1);
  }

  editForm(colis: Colis) {

    this.type = "u";
    this.colis = colis;

    this.clearFormArray(this.detailsColis);

    this.colisForm.setValue({
      id: colis.id,
      reference: colis.reference,
      qrCode: colis.qrCode,
      valeurColis: colis.valeurColis,
      description: colis.description,
      nomDestinataire: colis.nomDestinataire,
      contactDestinataire: colis.contactDestinataire,
      adresseDestinataire: colis.adresseDestinataire,
      client: colis.client,
      siteDestinataire: colis.siteDestinataire,
      detailsColis: []
    });

    let id = this.colisForm.get('id');
    let reference = this.colisForm.get('reference');
    (this.type) ? id.disable() : id.enable();
    (this.type) ? reference.disable() : reference.enable();


    if (colis.detailsColis.length > 0) {
      this.setDetailsColis(colis.detailsColis);
    }
    console.log(this.colisForm);

    this.selectTab(1);
  }

  showForm(colis: Colis) {
    this.type = "s";
    this.colis = colis;

    this.clearFormArray(this.detailsColis);

    this.colisForm.setValue({
      id: colis.id,
      reference: colis.reference,
      qrCode: colis.qrCode,
      valeurColis: colis.valeurColis,
      description: colis.description,
      nomDestinataire: colis.nomDestinataire,
      contactDestinataire: colis.contactDestinataire,
      adresseDestinataire: colis.adresseDestinataire,
      client: colis.client,
      siteDestinataire: colis.siteDestinataire,
      detailsColis: []
    });

    if (colis.detailsColis.length > 0) {
      this.setDetailsColis(colis.detailsColis);
    }

    this.colisForm.disable();

    this.selectTab(1);
  }

  setDetailsColis(detailsColis: DetailsColis[]) {
    const detailsColisFGs = detailsColis.map(dc => this.fb.group(dc));
    const dcFormArray = this.fb.array(detailsColisFGs);
    this.colisForm.setControl('detailsColis', dcFormArray);
  }

  saveColis() {
    console.log(this.colisForm);
    this.isLoading = true;
    this.colis.valeurColis = this.colisForm.value.valeurColis;
    this.colis.description = this.colisForm.value.description;
    this.colis.nomDestinataire = this.colisForm.value.nomDestinataire;
    this.colis.contactDestinataire = this.colisForm.value.contactDestinataire;
    this.colis.adresseDestinataire = this.colisForm.value.adresseDestinataire;
    this.colis.siteDestinataire = this.colisForm.value.siteDestinataire;
    this.colis.client = this.colisForm.value.client;
    this.colis.detailsColis = this.colisForm.value.detailsColis;

    this.colisService.addColis(this.colis)
      .subscribe((colis) => {
        console.log(colis);
        this.clearSearchColis();
        this.clearColisForm();
        this.isLoading = false;
        this.selectTab(0);
        this.showSave('Colis enregistré avec succès!')
      }, (err) => {
        console.log(err);
        this.isLoading = false;
      })
  }

  updateColis() {
    console.log(this.colisForm);
    this.isLoading = true;
    this.colis.valeurColis = this.colisForm.getRawValue().valeurColis;
    this.colis.description = this.colisForm.getRawValue().description;
    this.colis.nomDestinataire = this.colisForm.getRawValue().nomDestinataire;
    this.colis.contactDestinataire = this.colisForm.getRawValue().contactDestinataire;
    this.colis.adresseDestinataire = this.colisForm.getRawValue().adresseDestinataire;
    this.colis.siteDestinataire = this.colisForm.getRawValue().siteDestinataire;
    this.colis.client = this.colisForm.getRawValue().client;
    this.colis.detailsColis = this.colisForm.getRawValue().detailsColis;

    this.colisService.updateColis(this.colis)
      .subscribe((colis) => {
        console.log(colis);
        this.clearSearchColis();
        this.clearColisForm();
        this.isLoading = false;
        this.selectTab(0);
        this.showUpdate('Colis modifié avec succès!')
      }, (err) => {
        console.log(err);
        this.isLoading = false;
      })
  }

  // ---------------------------- END FORM COLIS --------------------------------------------
  // ------------------------------ START TOAST ---------------------------------------------
  showSave(msg: string) {
    this.toastr.success(msg, 'Enregistrement', {
      closeButton: true,
      timeOut: 3000,
    });
  }

  showUpdate(msg: string) {
    this.toastr.warning(msg, 'Modification', {
      closeButton: true,
      timeOut: 3000,
    });
  }

  // ------------------------------ END TOAST ------------------------------------------

  // ------------------------------- START MODAL REMOVAL -------------------------------------

  openRemoveModal(colis: Colis, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveColisComponent, {class: 'modal-sm'});

    (<ModalRemoveColisComponent>this.modalRef.content).showRemoveModal(
      type,
      colis
    );

    (<ModalRemoveColisComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allColis.colis[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allColis.colis[index].enable = 1;
      }
      if (result.type === 'r') {
        this.receiveSearchColis();
      }
    });

  }

  // ------------------------------- END MODAL REMOVAL ---------------------------------------

  //----------------------------- START SUIVI COLIS ---------------------------------------

  suiviColis(suivi: string, colis: Colis){

    let type = '';
    switch(suivi){
      case 'arrivee':
        if(this.colis.expeditionColis !== null){
          if(this.colis.arriveeColis === null){
            type = 'i';
            this.modalRef = this.modalService.show(SuiviColisComponent, {class: 'modal-md modal-primary'});
          }else{
            type = 'u';
            this.modalRef = this.modalService.show(SuiviColisComponent, {class: 'modal-md modal-warning'});
          }
        }else{
          this.showAlerte("Le colis n'a pas encore été expédié!");
        }

        break;

      case 'reception':
        if(this.colis.arriveeColis !== null){
          if(this.colis.receptionColis === null){
            type = 'i';
            this.modalRef = this.modalService.show(SuiviColisComponent, {class: 'modal-md modal-primary'});
          }else{
            type = 'u';
            this.modalRef = this.modalService.show(SuiviColisComponent, {class: 'modal-md modal-warning'});
          }
        }else{
          this.showAlerte("L'arrivée doit être renseignée avant!");
        }
        break;

      case 'livraison':
        if(this.colis.arriveeColis !== null && this.colis.receptionColis !== null){
          if(this.colis.livraisonColis === null){
            type = 'i';
            this.modalRef = this.modalService.show(SuiviColisComponent, {class: 'modal-md modal-primary'});
          }else{
            type = 'u';
            this.modalRef = this.modalService.show(SuiviColisComponent, {class: 'modal-md modal-warning'});
          }
        }else{
          this.showAlerte("L'arrivée et la réception doivent être renseignéess avant!");
        }
        break;
      default:
        console.log('Error');
        break;
    }
    (<SuiviColisComponent>this.modalRef.content).showColisModal(
      type,
      suivi,
      colis
    );

    (<SuiviColisComponent>this.modalRef.content).onClose.subscribe(result => {
      this.colis = result.colis;
      this.receiveSearchColis();
    });
  }

  showAlerte(msg: string) {
    this.toastr.error(msg, "Alerte", {
      closeButton: true,
      timeOut: 3000,
    });
  }

  //----------------------------- END SUIVI COLIS ---------------------------------------

  ngOnDestroy() {
    this.colisSubscription !== null ? this.colisSubscription.unsubscribe() : null;
  }
}
