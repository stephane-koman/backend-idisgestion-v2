import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Client} from '../../models/client/client';
import {ClientService} from '../../services/client/client.service';
import {Subscription} from 'rxjs';
import {DomaineActivite} from '../../models/domaine-activite/domaine-activite';
import {Colis} from '../../models/colis/colis';
import {DomaineActiviteService} from '../../services/domaine-activite/domaine-activite.service';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModalClientComponent implements OnInit, OnDestroy {
  public client: Client = new Client();
  clientSubscription: Subscription = null;

  public type: string;
  clientForm: FormGroup;
  public onClose: Subject<any>;

  allDomainesActivite: Array<DomaineActivite> = new Array<DomaineActivite>();
  domaineActivite: DomaineActivite = null;

  isLoading: boolean = false;

  error: string = '';
  alert: any = {
    type: 'danger',
    dismissible: true
  };

  constructor(private clientService: ClientService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private domaineActiviteService: DomaineActiviteService,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.createForm();
  }

  public showClientModal(type: string, client: Client): void {
    this.type = type;
    if (client !== null) {

      this.clientForm.setValue({
        id: client.id || '',
        codeClient: client.codeClient || '',
        raisonSociale: client.raisonSociale || '',
        domaineActivite: client.domaineActivite || '',
        responsable: client.responsable || '',
        contact: client.contact || '',
        email: client.email || '',
        adresse: client.adresse || ''
      });

      let id = this.clientForm.get('id');
      let codeClient = this.clientForm.get('codeClient');
      let raisonSociale = this.clientForm.get('raisonSociale');
      let domaineActivite = this.clientForm.get('domaineActivite');
      let responsable = this.clientForm.get('responsable');
      let contact = this.clientForm.get('contact');
      let adresse = this.clientForm.get('adresse');
      let email = this.clientForm.get('email');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's' || this.type === 'u') ? codeClient.disable() : codeClient.enable();
      (this.type === 's') ? raisonSociale.disable() : raisonSociale.enable();
      (this.type === 's') ? domaineActivite.disable() : domaineActivite.enable();
      (this.type === 's') ? responsable.disable() : responsable.enable();
      (this.type === 's') ? contact.disable() : contact.enable();
      (this.type === 's') ? adresse.disable() : adresse.enable();
      (this.type === 's') ? email.disable() : email.enable();

    }
  }

  createForm() {

    this.clientForm = this.fb.group({
      id: new FormControl(this.client.id),
      codeClient: new FormControl(this.client.codeClient),
      raisonSociale: new FormControl(this.client.raisonSociale, [Validators.required, Validators.minLength(4)]),
      //domaineActivite: new FormControl(this.client.domaineActivite, [Validators.required]),
      domaineActivite: new FormControl(this.client.domaineActivite),
      //responsable: new FormControl(this.client.responsable, [Validators.required]),
      responsable: new FormControl(this.client.responsable),
      contact: new FormControl(this.client.contact, [Validators.required, Validators.minLength(8), Validators.pattern('[0-9 ]*')]),
      email: new FormControl(this.client.email, [Validators.required, Validators.email]),
      adresse: new FormControl(this.client.adresse, [Validators.required])
    });

  }

  // ---------------------------  START DOMAINE ACTIVITE  ----------------------------------------
  searchCodeDomaineActivite(domaineActivite: DomaineActivite) {
    console.log(domaineActivite);
    if (domaineActivite !== undefined) {
      this.domaineActivite = domaineActivite;
    } else {
      this.domaineActivite = null;
    }
  }

  getDomaineActiviteByCode(event: any){
    console.log(event.term);
    if(event.term !== ""){
      this.domaineActiviteService.getDomainesActiviteByCode(event.term)
        .subscribe((domainesActivite) => {
          this.allDomainesActivite = domainesActivite;
        })
    }

  }

  // -------------------------- END DOMAINE ACTIVITE -----------------------------------------

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveClient();
    }
    if (this.type === 'u') {
      this.updateClient();
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

  saveClient() {
    this.isLoading = true;
    this.client.type = "CLIENT";
    this.client.raisonSociale = this.clientForm.value.raisonSociale;
    this.client.domaineActivite = this.clientForm.value.domaineActivite;
    this.client.responsable = this.clientForm.value.responsable;
    this.client.contact = this.clientForm.value.contact;
    this.client.adresse = this.clientForm.value.adresse;
    this.client.email = this.clientForm.value.email;

    this.clientSubscription = this.clientService.addClient(this.client)
      .subscribe((client: Client) => {
        let data = {
          type: this.type,
          client: client
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('Client enregistré avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateClient() {
    this.isLoading = true;
    this.client.type = "CLIENT";
    this.client.id = this.clientForm.getRawValue().id;
    this.client.codeClient = this.clientForm.getRawValue().codeClient;
    this.client.raisonSociale = this.clientForm.getRawValue().raisonSociale;
    this.client.domaineActivite = this.clientForm.getRawValue().domaineActivite;
    this.client.responsable = this.clientForm.getRawValue().responsable;
    this.client.contact = this.clientForm.getRawValue().contact;
    this.client.adresse = this.clientForm.getRawValue().adresse;
    this.client.email = this.clientForm.getRawValue().email;

    this.clientSubscription = this.clientService.updateClient(this.client)
      .subscribe((client: Client) => {
        let data = {
          type: this.type,
          client: client
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('Client modifié avec succès');
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
    this.clientSubscription !== null ? this.clientSubscription.unsubscribe() : null;
  }

}
