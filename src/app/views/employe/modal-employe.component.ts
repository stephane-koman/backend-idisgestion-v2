import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {Employe} from '../../models/employe/employe';
import {EmployeService} from '../../services/employe/employe.service';
import {Site} from '../../models/site/site';
import {SiteService} from '../../services/site/site.service';
import {Fonction} from '../../models/fonction/fonction';
import {FonctionService} from '../../services/fonction/fonction.service';

@Component({
  selector: 'app-modal-employe',
  templateUrl: './modal-employe.component.html',
  styleUrls: ['./modal-employe.component.scss']
})
export class ModalEmployeComponent implements OnInit, OnDestroy {

  public employe: Employe = new Employe();
  employeSubscription: Subscription = null;
  allSites: Array<Site> = new Array<Site>();
  siteSubscription: Subscription = null;
  allFonctions: Array<Fonction> = new Array<Fonction>();
  fonctionSubscription: Subscription = null;
  public type: string;
  employeForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = '';
  alert: any = {
    type: 'danger',
    dismissible: true
  };

  constructor(private employeService: EmployeService,
              private siteService: SiteService,
              private fonctionService: FonctionService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.getAllSites();
    this.getAllFonctions();
    this.createForm();
  }

  getAllSites(){
    this.siteSubscription = this.siteService.getAllSites().subscribe((sites) => {
      this.allSites = sites;
    });
  }

  getAllFonctions(){
    this.fonctionSubscription = this.fonctionService.getAllFonctions().subscribe((fonctions) => {
      this.allFonctions = fonctions;
    });
  }

  public showEmployeModal(type: string, employe: Employe): void {
    this.type = type;

    let matricule = this.employeForm.get('matricule');
    (this.type) ? matricule.disable() : matricule.enable();

    if (employe !== null) {

      this.employeForm.setValue({
        id: employe.id || '',
        matricule: employe.matricule || '',
        raisonSociale: employe.raisonSociale || '',
        site: employe.site || '',
        fonction: employe.fonction || '',
        contact: employe.contact || '',
        email: employe.email || '',
        adresse: employe.adresse || ''
      });

      let id = this.employeForm.get('id');

      let site = this.employeForm.get('site');
      let fonction = this.employeForm.get('fonction');
      let raisonSociale = this.employeForm.get('raisonSociale');
      let contact = this.employeForm.get('contact');
      let adresse = this.employeForm.get('adresse');
      let email = this.employeForm.get('email');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's') ? raisonSociale.disable() : raisonSociale.enable();
      (this.type === 's') ? site.disable() : site.enable();
      (this.type === 's') ? fonction.disable() : fonction.enable();
      (this.type === 's') ? contact.disable() : contact.enable();
      (this.type === 's') ? adresse.disable() : adresse.enable();
      (this.type === 's') ? email.disable() : email.enable();

    }
  }

  createForm() {

    this.employeForm = this.fb.group({
      id: new FormControl(this.employe.id),
      matricule: new FormControl(this.employe.matricule),
      raisonSociale: new FormControl(this.employe.raisonSociale, [Validators.required, Validators.minLength(4)]),
      site: new FormControl(this.employe.site, [Validators.required]),
      fonction: new FormControl(this.employe.fonction, [Validators.required]),
      contact: new FormControl(this.employe.contact, [Validators.required, Validators.minLength(8), Validators.pattern('[0-9 ]*')]),
      email: new FormControl(this.employe.email, [Validators.required, Validators.email]),
      adresse: new FormControl(this.employe.adresse, [Validators.required])
    });

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveEmploye();
    }
    if (this.type === 'u') {
      this.updateEmploye();
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

  saveEmploye() {
    this.isLoading = true;
    this.employe.type = "EMPLOYE";
    this.employe.raisonSociale = this.employeForm.value.raisonSociale;
    this.employe.site = this.employeForm.value.site;
    this.employe.fonction = this.employeForm.value.fonction;
    this.employe.contact = this.employeForm.value.contact;
    this.employe.adresse = this.employeForm.value.adresse;
    this.employe.email = this.employeForm.value.email;

    this.employeSubscription = this.employeService.addEmploye(this.employe)
      .subscribe((employe: Employe) => {
        let data = {
          type: this.type,
          employe: employe
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('Employe enregistré avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateEmploye() {
    this.isLoading = true;
    this.employe.type = "EMPLOYE";
    this.employe.id = this.employeForm.getRawValue().id;
    this.employe.matricule = this.employeForm.getRawValue().matricule;
    this.employe.raisonSociale = this.employeForm.getRawValue().raisonSociale;
    this.employe.site = this.employeForm.getRawValue().site;
    this.employe.fonction = this.employeForm.getRawValue().fonction;
    this.employe.contact = this.employeForm.getRawValue().contact;
    this.employe.adresse = this.employeForm.getRawValue().adresse;
    this.employe.email = this.employeForm.getRawValue().email;

    this.employeSubscription = this.employeService.updateEmploye(this.employe)
      .subscribe((employe: Employe) => {
        let data = {
          type: this.type,
          employe: employe
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('Employe modifié avec succès');
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
    this.employeSubscription !== null ? this.employeSubscription.unsubscribe() : null;
    this.siteSubscription !== null ? this.siteSubscription.unsubscribe() : null;
    this.fonctionSubscription !== null ? this.fonctionSubscription.unsubscribe() : null;
  }

}
