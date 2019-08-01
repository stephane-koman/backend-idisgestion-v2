import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {TabDirective} from 'ngx-bootstrap/tabs';
import {Subject, Subscription} from 'rxjs';
import {TokenService} from '../../services/token/token.service';
import {ReglementService} from '../../services/reglement/reglement.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Reglement} from '../../models/reglement/reglement';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsDatepickerConfig, BsLocaleService, TabsetComponent} from 'ngx-bootstrap';
import {ListeReglements} from '../../models/reglement/liste-reglements';
import {TypeReglementService} from '../../services/type-reglement/type-reglement.service';
import {Devise} from '../../models/devise/devise';
import {TvaService} from '../../services/tva/tva.service';
import {DeviseService} from '../../services/devise/devise.service';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {ModalRemoveReglementComponent} from './modal-remove-reglement.component';
import {Facture} from '../../models/facture/facture';
import {FactureService} from '../../services/facture/facture.service';
import {TypeReglement} from '../../models/type-reglement/type-reglement';

@Component({
  selector: 'app-reglements',
  templateUrl: './reglements.component.html',
  styleUrls: ['./reglements.component.scss']
})
export class ReglementsComponent implements OnInit {
  @ViewChild('staticTabs', {static: false}) staticTabs: TabsetComponent;

  modalRef: BsModalRef;

  //---------------------------- START COLIS FORM -------------------------------

  public type: string;
  reglement: Reglement = new Reglement();
  reglementForm: FormGroup;
  public onClose: Subject<any>;
  isLoading: boolean = false;
  allFactures: Array<Facture> = new Array<Facture>();
  allDevises: Array<Devise> = new Array<Devise>();
  facture: Facture = null;
  montantHT: number = 0;
  montantTTC: number = 0;
  montantRestant: number = null;
  tva: number = 0;
  //---------------------------- END COLIS FORM -------------------------------

  bsConfig: Partial<BsDatepickerConfig>;
  colorTheme = 'theme-blue';
  locale = 'fr';

  allReglements: ListeReglements;
  allTypesReglements: Array<TypeReglement>;
  user: Utilisateur = new Utilisateur();
  reglementSubscription: Subscription = null;

  numeroFacture: string = '';
  referenceColis: string = '';
  nomTypeReglement: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;
  showBtn: boolean = false;

  alert: any = {
    type: 'danger',
    dismissible: true
  };

  error: string = '';

  constructor(private reglementService: ReglementService,
              private factureService: FactureService,
              private typeReglementService: TypeReglementService,
              private tvaService: TvaService,
              private deviseService: DeviseService,
              private userService: UtilisateurService,
              private tokenService: TokenService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private localeService: BsLocaleService) {
  }

  ngOnInit() {
    this.type = 'i';
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.applyLocale();
    this.searchReglements();
    this.getProfile();
    //this.getAllFactures();
    this.getTypesReglements();
    this.createReglement();
  }

  onValueChange(value: Date): void {
    console.log(value);
  }

  applyLocale() {
    this.localeService.use(this.locale);
  }

  onSelect(tab: TabDirective): void {
    if (tab.id === 'liste-reglement') {
      this.type = 'i';
      this.reglementForm.enable();
      this.clearReglementForm();
      this.showBtn = false;
      this.error = null;
      this.montantRestant = null;
      this.reload();
    }
    this.allFactures = [];
  }

  clearReglementForm() {
    this.reglementForm.reset({
      id: '',
      typeReglement: null,
      facture: null,
    });
    this.reglement = new Reglement();
    this.facture = null;
  }

  clearSearchReglement() {
    this.numeroFacture = '';
    this.nomTypeReglement = '';
    this.referenceColis = '';
    this.currentPage = 0;
    this.searchReglements();
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  searchNomTypeReglement(event: any) {
    console.log(event);
    if(event !== undefined){
      this.nomTypeReglement = event.nomTypeReglement;
    }else{
      this.nomTypeReglement = "";
    }

    this.searchReglements();
  }

  searchStatut() {
    this.searchReglements();
  }

  // ---------------------------------- START API REQUEST-----------------------------------------------------
  searchReglements() {
    this.reglementSubscription = this.reglementService.searchReglements(this.numeroFacture, this.nomTypeReglement, this.enable, this.currentPage, this.size)
      .subscribe((reglements) => {
        this.allReglements = reglements;
        this.pages = new Array(reglements.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  getTypesReglements() {
    this.typeReglementService.getAllTypeReglement()
      .subscribe((typesReglements) => {
        this.allTypesReglements = typesReglements;
      })
  }

  getProfile() {
    this.userService.getProfile().subscribe((user) => {
      this.user = user;
      this.tva = user.personne.site.tva.valeurTva;
    });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchReglements();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchReglements();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchReglements();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchReglements();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchReglements();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchReglements();
  }

  reload() {
    this.currentPage = 0;
    this.searchReglements();
  }

  getNomTypeReglement(event: any){
    console.log(event);
  }

  searchNumeroFacture(facture: any) {

    console.log(facture);
    if(facture !== undefined){
      this.facture = facture;
      this.montantRestant = this.facture.debit - this.facture.montantFactureRegle;
    }else {
      this.facture = null;
      this.montantRestant = null;
    }

  }

  findFacturesByNumeroFacture(event: any){
    console.log(event.term);
    if(event.term !== ""){
      this.factureService.getFacturesByNumeroFacture(event.term)
        .subscribe((factures) => {
          this.allFactures = factures;
        });
    }
  }

  // ---------------------------- START FORM COLIS --------------------------------------------

  createReglement() {
    this.reglementForm = this.fb.group({
      id: [this.reglement.id],
      typeReglement: [this.reglement.typeReglement, Validators.required],
      montantRegle: [this.reglement.montantRegle, Validators.required],
      facture: [this.reglement.facture, Validators.required]
    });
  }

  editForm(reglement: Reglement) {

    this.type = 'u';
    this.reglement = reglement;
    this.facture = reglement.facture;

    this.reglementForm.setValue({
      id: reglement.id,
      typeReglement: reglement.typeReglement,
      montantRegle: reglement.montantRegle,
      facture: reglement.facture
    });

    let id = this.reglementForm.get('id');
    let facture = this.reglementForm.get('facture');
    (this.type) ? id.disable() : id.enable();
    (this.type) ? facture.disable() : facture.enable();

    this.selectTab(1);
  }

  showForm(reglement: Reglement) {
    this.type = 's';
    this.reglement = reglement;
    this.facture = reglement.facture;

    this.reglementForm.setValue({
      id: reglement.id,
      typeReglement: reglement.typeReglement,
      montantRegle: reglement.montantRegle,
      facture: reglement.facture
    });

    let id = this.reglementForm.get('id');
    let montantRegle = this.reglementForm.get('montantRegle');
    let typeReglement = this.reglementForm.get('typeReglement');
    let facture = this.reglementForm.get('facture');
    (this.type) ? id.disable() : id.enable();
    (this.type) ? montantRegle.disable() : montantRegle.enable();
    (this.type) ? typeReglement.disable() : typeReglement.enable();
    (this.type) ? facture.disable() : facture.enable();

    this.selectTab(1);
  }


  saveReglement() {
    this.isLoading = true;
    this.reglement.type = "REGLEMENT";
    this.reglement.typeReglement = this.reglementForm.value.typeReglement;
    this.reglement.montantRegle = this.reglementForm.value.montantRegle;
    this.reglement.facture = this.reglementForm.value.facture;
    this.reglement.colis = this.reglement.facture.colis;

    this.reglementService.addReglement(this.reglement)
      .subscribe((reglement) => {
        console.log(reglement);
        this.clearSearchReglement();
        this.clearReglementForm();
        this.isLoading = false;
        this.selectTab(0);
        this.showSave('Reglement enregistré avec succès!');
        this.allFactures = [];

      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      })
  }

  updateReglement() {
    this.isLoading = true;
    this.reglement.type = "REGLEMENT";
    this.reglement.id = this.reglementForm.getRawValue().id;
    this.reglement.montantRegle = this.reglementForm.getRawValue().montantRegle;
    this.reglement.typeReglement = this.reglementForm.getRawValue().typeReglement;
    this.reglement.facture = this.reglementForm.getRawValue().facture;
    this.reglement.colis = this.reglement.facture.colis;

    this.reglementService.updateReglement(this.reglement)
      .subscribe((reglement) => {
        console.log(reglement);
        this.clearSearchReglement();
        this.clearReglementForm();
        this.isLoading = false;
        this.selectTab(0);
        this.showUpdate('Reglement modifié avec succès!');
        this.allFactures = [];
      }, (err) => {
        console.log(err);
        this.error = err;
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

  openRemoveModal(reglement: Reglement, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveReglementComponent, {class: 'modal-sm'});

    (<ModalRemoveReglementComponent>this.modalRef.content).showRemoveModal(
      type,
      reglement
    );

    (<ModalRemoveReglementComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allReglements.reglements[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allReglements.reglements[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchReglements();
      }
      this.allFactures = [];
    });

  }

  // ------------------------------- END MODAL REMOVAL ---------------------------------------

  ngOnDestroy() {
    this.reglementSubscription !== null ? this.reglementSubscription.unsubscribe() : null;
  }

  dismiss() {
    this.error = '';
  }

}
