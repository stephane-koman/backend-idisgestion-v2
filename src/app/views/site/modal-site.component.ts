import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {Site} from '../../models/site/site';
import {SiteService} from '../../services/site/site.service';
import {PaysService} from '../../services/pays/pays.service';
import {Pays} from '../../models/pays/pays';
import {Devise} from '../../models/devise/devise';
import {Tva} from '../../models/tva/tva';
import {TvaService} from '../../services/tva/tva.service';
import {DeviseService} from '../../services/devise/devise.service';

@Component({
  selector: 'app-modal-site',
  templateUrl: './modal-site.component.html',
  styleUrls: ['./modal-site.component.scss']
})
export class ModalSiteComponent implements OnInit, OnDestroy {
  public site: Site = new Site();
  siteSubscription: Subscription = null;
  allTvas: Array<Tva> = new Array<Tva>();
  allDevises: Array<Devise> = new Array<Devise>();
  allPays: Array<Pays> = new Array<Pays>();
  paysSubscription: Subscription = null;
  public type: string;
  siteForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = '';
  alert: any = {
    type: 'danger',
    dismissible: true
  };

  constructor(private siteService: SiteService,
              private tvaService: TvaService,
              private deviseService: DeviseService,
              private paysService: PaysService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.getAllTvas();
    this.getAllDevises();
    this.getAllPays();
    this.createForm();
  }

  getAllTvas(){
    this.tvaService.getAllTvas()
      .subscribe((tvas) => {
        this.allTvas = tvas;
      })
  }

  getAllDevises(){
    this.deviseService.getAllDevises()
      .subscribe((devises) => {
        this.allDevises = devises;
      })
  }

  getAllPays() {
    this.paysSubscription = this.paysService.getAllPays().subscribe((pays) => {
      this.allPays = pays;
    });
  }

  public showSiteModal(type: string, site: Site): void {
    this.type = type;
    if (site !== null) {

      this.siteForm.setValue({
        id: site.id || '',
        nomSite: site.nomSite || '',
        codeSite: site.codeSite || '',
        contact: site.contact || '',
        email: site.email || '',
        siret: site.siret || '',
        adresse: site.adresse || '',
        description: site.description || '',
        tva: site.tva || {},
        devise: site.devise || {},
        pays: site.pays || {}
      });

      let id = this.siteForm.get('id');
      let nomSite = this.siteForm.get('nomSite');
      let codeSite = this.siteForm.get('codeSite');
      let contact = this.siteForm.get('contact');
      let email = this.siteForm.get('email');
      let siret = this.siteForm.get('siret');
      let adresse = this.siteForm.get('adresse');
      let description = this.siteForm.get('description');
      let tva = this.siteForm.get('tva');
      let devise = this.siteForm.get('devise');
      let pays = this.siteForm.get('pays');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's') ? nomSite.disable() : nomSite.enable();
      (this.type === 's') ? codeSite.disable() : codeSite.enable();
      (this.type === 's') ? contact.disable() : contact.enable();
      (this.type === 's') ? email.disable() : email.enable();
      (this.type === 's') ? siret.disable() : siret.enable();
      (this.type === 's') ? adresse.disable() : adresse.enable();
      (this.type === 's') ? description.disable() : description.enable();
      (this.type === 's') ? tva.disable() : tva.enable();
      (this.type === 's') ? devise.disable() : devise.enable();
      (this.type === 's') ? pays.disable() : pays.enable();

    }

  }

  createForm() {

    this.siteForm = this.fb.group({
      id: new FormControl(this.site.id),
      nomSite: new FormControl(this.site.nomSite, [Validators.required, Validators.minLength(4)]),
      codeSite: new FormControl(this.site.codeSite, [Validators.required, Validators.minLength(3)]),
      contact: new FormControl(this.site.contact, [Validators.required, Validators.minLength(8), Validators.pattern('[0-9 ]*')]),
      email: new FormControl(this.site.email, [Validators.required, Validators.email]),
      siret: new FormControl(this.site.siret, [Validators.minLength(12)]),
      adresse: new FormControl(this.site.adresse),
      description: new FormControl(this.site.description),
      tva: new FormControl(this.site.tva, [Validators.required]),
      devise: new FormControl(this.site.devise, [Validators.required]),
      pays: new FormControl(this.site.pays, [Validators.required])
    });

  }

  paysValue(event) {

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveSite();
    }
    if (this.type === 'u') {
      this.updateSite();
    }
  }

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

  saveSite() {
    this.isLoading = true;
    this.site.nomSite = this.siteForm.value.nomSite;
    this.site.codeSite = this.siteForm.value.codeSite;
    this.site.contact = this.siteForm.value.contact;
    this.site.email = this.siteForm.value.email;
    this.site.siret = this.siteForm.value.siret;
    this.site.adresse = this.siteForm.value.adresse;
    this.site.description = this.siteForm.value.description;
    this.site.tva = this.siteForm.value.tva;
    this.site.devise = this.siteForm.value.devise;
    this.site.pays = this.siteForm.value.pays;

    this.siteSubscription = this.siteService.addSite(this.site)
      .subscribe((site: Site) => {
        let data = {
          type: this.type,
          site: site
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('Site enregistré avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateSite() {
    this.isLoading = true;
    this.site.id = this.siteForm.getRawValue().id;
    this.site.nomSite = this.siteForm.getRawValue().nomSite;
    this.site.codeSite = this.siteForm.getRawValue().codeSite;
    this.site.contact = this.siteForm.getRawValue().contact;
    this.site.email = this.siteForm.getRawValue().email;
    this.site.siret = this.siteForm.getRawValue().siret;
    this.site.adresse = this.siteForm.getRawValue().adresse;
    this.site.description = this.siteForm.getRawValue().description;
    this.site.tva = this.siteForm.getRawValue().tva;
    this.site.devise = this.siteForm.getRawValue().devise;
    this.site.pays = this.siteForm.getRawValue().pays;

    this.siteSubscription = this.siteService.updateSite(this.site)
      .subscribe((site: Site) => {
        let data = {
          type: this.type,
          site: site
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('Site modifié avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  dismiss() {
    this.error = '';
  }

  ngOnDestroy(){
    this.siteSubscription !== null ? this.siteSubscription.unsubscribe() : null;
    this.paysSubscription !== null ? this.paysSubscription.unsubscribe() : null;
  }

}
