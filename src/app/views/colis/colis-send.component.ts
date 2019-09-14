import {Component, OnInit, ViewChild} from '@angular/core';
import {ColisService} from '../../services/colis/colis.service';
import {ListeColis} from '../../models/colis/liste-colis';
import {Subscription} from 'rxjs';
import {TokenService} from '../../services/token/token.service';
import {TabDirective} from 'ngx-bootstrap/tabs';
import {TabsetComponent} from 'ngx-bootstrap';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Colis} from '../../models/colis/colis';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ToastrService} from 'ngx-toastr';
import {Client} from '../../models/client/client';
import {ClientService} from '../../services/client/client.service';
import {SiteService} from '../../services/site/site.service';
import {Site} from '../../models/site/site';
import {DetailsColis} from '../../models/colis/details-colis';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ModalRemoveColisComponent} from './modal-remove-colis.component';
import {SuiviColisComponent} from './suivi-colis.component';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {NgxSpinnerService} from "ngx-spinner";
import {DomSanitizer} from '@angular/platform-browser';
import {Image} from '../../models/image/image';

@Component({
  selector: 'app-colis-send',
  templateUrl: './colis-send.component.html',
  styleUrls: ['./colis-send.component.scss']
})
export class ColisSendComponent implements OnInit {

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

  print: boolean = false;
  @ViewChild('externalPdfViewer', {static: false}) public externalPdfViewer;

  myFiles: any[] = [];
  images: any[] = [];

  constructor(private colisService: ColisService,
              private clientService: ClientService,
              private siteService: SiteService,
              private userService: UtilisateurService,
              private tokenService: TokenService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService,
              private sanitizer: DomSanitizer
              ) {
  }

  ngOnInit() {
    this.type = "i";
    this.getProfile();
    this.sendSearchColis();
    //this.getAllClients();
    this.getAllSites();
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
      codeLivraison: '',
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
    this.images = [];
    this.myFiles = [];
  }

  clearSearchColis() {
    this.reference = '';
    this.nomDestinataire = '';
    this.nomClient = '';
    this.currentPage = 0;
    this.sendSearchColis();
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  searchReference() {
    this.sendSearchColis();
  }

  searchNomClient() {
    this.sendSearchColis();
  }

  searchNomDestinataire() {
    this.sendSearchColis();
  }

  searchStatut() {
    this.sendSearchColis();
  }

  // ---------------------------------- START API REQUEST-----------------------------------------------------
  sendSearchColis() {
    this.colisSubscription = this.colisService.sendSearchColis(this.reference, this.nomClient, this.nomDestinataire, this.enable, this.currentPage, this.size)
      .subscribe((colis) => {
        this.allColis = colis;
        this.pages = new Array(colis.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  getClientsByRaisonSociale(event: any){
    if(event.term !== ""){
      this.clientService.getClientsByRaisonSociale(event.term)
        .subscribe((clients) => {
          this.allClients = clients;
        })
    }
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
    this.sendSearchColis();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.sendSearchColis();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.sendSearchColis();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.sendSearchColis();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.sendSearchColis();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.sendSearchColis();
  }

  reload() {
    this.currentPage = 0;
    this.sendSearchColis();
  }

  // ---------------------------- START FORM COLIS --------------------------------------------

  createColis() {
    this.colisForm = this.fb.group({
      id: [this.colis.id],
      reference: [this.colis.reference],
      codeLivraison: [this.colis.codeLivraison],
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
      prixUnitaire: ['', Validators.required],
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
      codeLivraison: colis.codeLivraison,
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
    let codeLivraison = this.colisForm.get('codeLivraison');
    (this.type) ? id.disable() : id.enable();
    (this.type) ? reference.disable() : reference.enable();
    (this.type) ? codeLivraison.disable() : codeLivraison.enable();


    if (colis.detailsColis.length > 0) {
      this.setDetailsColis(colis.detailsColis);
    }

    if(colis.images.length > 0) {
      this.setImagesColis(colis.images)
    }

    this.selectTab(1);
  }

  showForm(colis: Colis) {
    this.type = "s";
    this.colis = colis;

    this.clearFormArray(this.detailsColis);

    this.colisForm.setValue({
      id: colis.id,
      reference: colis.reference,
      codeLivraison: colis.codeLivraison,
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

    if(colis.images.length > 0) {
      this.setImagesColis(colis.images)
    }

    this.colisForm.disable();

    this.selectTab(1);
  }

  setDetailsColis(detailsColis: DetailsColis[]) {
    const detailsColisFGs = detailsColis.map(dc => this.fb.group(dc));
    const dcFormArray = this.fb.array(detailsColisFGs);
    this.colisForm.setControl('detailsColis', dcFormArray);
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], { type: 'image/jpeg' });
  }

  setImagesColis(imagesColis: Image[]) {

    this.images = [];
    this.myFiles = [];

    imagesColis.forEach(img => {

      this.myFiles.push(this.dataURItoBlob(img.file));

      let reader = new FileReader();

      reader.readAsDataURL(this.dataURItoBlob(img.file));

      reader.onload = () => {
        this.images.push(reader.result);
      }
    });
  }

  saveColis() {

    this.isLoading = true;

    this.colis.valeurColis = this.colisForm.value.valeurColis;
    this.colis.description = this.colisForm.value.description;
    this.colis.nomDestinataire = this.colisForm.value.nomDestinataire;
    this.colis.contactDestinataire = this.colisForm.value.contactDestinataire;
    this.colis.adresseDestinataire = this.colisForm.value.adresseDestinataire;
    this.colis.siteDestinataire = this.colisForm.value.siteDestinataire;
    this.colis.client = this.colisForm.value.client;
    this.colis.detailsColis = this.colisForm.value.detailsColis;

    const formData = new FormData();

    if(this.myFiles.length > 0){
      for (let i = 0; i < this.myFiles.length; i++) {
        formData.append("images", this.myFiles[i]);
      }
    }

    formData.append('colis', JSON.stringify(this.colis));

    this.images = [];
    this.myFiles = [];

    this.colisService.addColis(formData)
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

    this.isLoading = true;

    this.colis.valeurColis = this.colisForm.getRawValue().valeurColis;
    this.colis.description = this.colisForm.getRawValue().description;
    this.colis.nomDestinataire = this.colisForm.getRawValue().nomDestinataire;
    this.colis.contactDestinataire = this.colisForm.getRawValue().contactDestinataire;
    this.colis.adresseDestinataire = this.colisForm.getRawValue().adresseDestinataire;
    this.colis.siteDestinataire = this.colisForm.getRawValue().siteDestinataire;
    this.colis.client = this.colisForm.getRawValue().client;
    this.colis.detailsColis = this.colisForm.getRawValue().detailsColis;
    this.colis.images = [];


    const formData = new FormData();

    if(this.myFiles.length > 0){
      for (let i = 0; i < this.myFiles.length; i++) {
        console.log(i, ' : ', this.myFiles[i]);
        formData.append("images", this.myFiles[i]);
      }
    }

    formData.append('colis', JSON.stringify(this.colis));

    this.images = [];
    this.myFiles = [];

    this.colisService.updateColis(formData)
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
      });
  }

  hidePrint(){
    this.print = false;
  }

  downloadQrCode(colis: Colis) {

    this.print = true;
    this.spinner.show();

    this.colisService.getQrCodePDF(colis.reference)
        .subscribe((data) => {
              this.isLoading = false;
              let file = new Blob([data], {type: 'application/pdf'});
              //let fileURL = URL.createObjectURL(file);
              this.externalPdfViewer.pdfSrc = URL.createObjectURL(file);
              this.externalPdfViewer.refresh();
              this.spinner.hide();
            },
            (err) => {
              console.log(err);
              this.spinner.hide();
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
        this.sendSearchColis();
      }
    });

  }



  // ------------------------------- END MODAL REMOVAL ---------------------------------------

  //----------------------------- START SUIVI COLIS ---------------------------------------

  suiviColis(suivi: string, colis: Colis){

    let type = '';
    switch(suivi){
      case 'enregistrement':
        if(this.colis.enregistrementColis === null){
          type = 'i';
          this.modalRef = this.modalService.show(SuiviColisComponent, {class: 'modal-md modal-primary'});
        }else{
          type = 'u';
          this.modalRef = this.modalService.show(SuiviColisComponent, {class: 'modal-md modal-warning'});
        }
        break;

      case 'expedition':
        if(this.colis.expeditionColis === null){
          type = 'i';
          this.modalRef = this.modalService.show(SuiviColisComponent, {class: 'modal-md modal-primary'});
        }else{
          type = 'u';
          this.modalRef = this.modalService.show(SuiviColisComponent, {class: 'modal-md modal-warning'});
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
      this.sendSearchColis();
    });
  }

  //----------------------------- END SUIVI COLIS ---------------------------------------

  //------------------------------  START UPLOAD IMAGES   -----------------------------------
  onSelectFiles(e) {
    //console.log (typeof(e.target.files[0]));
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {

      this.myFiles.push(files[i]);

      let reader = new FileReader();

      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        this.images.push(reader.result);
      }
    }
  }

  deleteImage(index: number){
    this.images.splice(index, 1);
    this.myFiles.splice(index, 1);
  }


  //------------------------------  END UPLOAD IMAGES   -----------------------------------


  ngOnDestroy() {
    this.colisSubscription !== null ? this.colisSubscription.unsubscribe() : null;
  }
}
