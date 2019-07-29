import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ColisService} from '../../services/colis/colis.service';
import {Colis} from '../../models/colis/colis';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {EnregistrementColis} from '../../models/colis/enregistrement-colis';
import {ExpeditionColis} from '../../models/colis/expedition-colis';
import {ArriveeColis} from '../../models/colis/arrivee-colis';
import {ReceptionColis} from '../../models/colis/reception-colis';
import {LivraisonColis} from '../../models/colis/livraison-colis';

@Component({
  selector: 'app-suivi-colis',
  templateUrl: './suivi-colis.component.html',
  styleUrls: ['./suivi-colis.component.scss']
})
export class SuiviColisComponent implements OnInit {
  colis: Colis = new Colis();
  enregistrementColis: EnregistrementColis = new EnregistrementColis();
  expeditionColis: ExpeditionColis = new ExpeditionColis();
  arriveeColis: ArriveeColis = new ArriveeColis();
  receptionColis: ReceptionColis = new ReceptionColis();
  livraisonColis: LivraisonColis = new LivraisonColis();
  colisSubscription: Subscription = null;
  type: string;
  suivi: string;
  colisForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = "";
  alert: any = {
    type: "danger",
    dismissible: true
  };

  constructor(private colisService: ColisService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.createForm();
  }

  public showColisModal(type: string, suivi: string, colis: Colis): void {
    this.type = type;
    this.suivi = suivi;
    this.colis = colis;
    console.log(suivi);
    console.log(colis);
    switch(suivi){
      case 'enregistrement':
        if(this.type === 'u'){
          if(this.colis.enregistrementColis !== null){
            this.colisForm.setValue({
              id: colis.enregistrementColis.id || '',
              description: colis.enregistrementColis.description || '',
            });
          }
        }
        break;
      case 'expedition':
        if(this.type === 'u'){
          if(this.colis.expeditionColis !== null){
            this.colisForm.setValue({
              id: colis.expeditionColis.id || '',
              description: colis.expeditionColis.description || '',
            });
          }
        }
        break;
      case 'arrivee':
        if(this.type === 'u'){
          if(this.colis.arriveeColis !== null){
            this.colisForm.setValue({
              id: colis.arriveeColis.id || '',
              description: colis.arriveeColis.description || '',
            });
          }
        }
        break;
      case 'reception':
        if(this.type === 'u'){
          if(this.colis.receptionColis !== null){
            this.colisForm.setValue({
              id: colis.receptionColis.id || '',
              description: colis.receptionColis.description || '',
            });
          }
        }
        break;
      case 'livraison':
        if(this.type === 'u'){
          if(this.colis.livraisonColis !== null){
            this.colisForm.setValue({
              id: colis.livraisonColis.id || '',
              description: colis.livraisonColis.description || '',
            });
          }
        }
        break;
      default:
        console.log("error");
        break;
    }

  }

  createForm() {

    this.colisForm = this.fb.group({
      id: new FormControl(''),
      description: new FormControl('', [Validators.required])
    });

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveSuiviColis();
    }
    if (this.type === 'u') {
      this.updateSuiviColis();
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

  saveSuiviColis() {
    this.isLoading = true;
    switch(this.suivi){
      case 'enregistrement':
        this.enregistrementColis.description = this.colisForm.value.description;
        this.colis.enregistrementColis = this.enregistrementColis;
        this.colisSubscription = this.colisService.addEnregistrementColis(this.colis)
          .subscribe((colis: Colis) => {
            console.log(colis);
            let data = {
              type: this.type,
              suivi: this.suivi,
              colis: colis
            };
            this.isLoading = false;
            this.onClose.next(data);
            this.showSave('Enregistrement effectué avec succès');
            this.modalRef.hide();
          }, (err) => {
            console.log(err);
            this.error = err;
            this.isLoading = false;
          });
        break;
      case 'expedition':
        this.expeditionColis.description = this.colisForm.value.description;
        this.colis.expeditionColis = this.expeditionColis;
        this.colisSubscription = this.colisService.addExpeditionColis(this.colis)
          .subscribe((colis: Colis) => {
            let data = {
              type: this.type,
              suivi: this.suivi,
              colis: colis
            };
            this.isLoading = false;
            this.onClose.next(data);
            this.showSave('Expédition enregistré avec succès');
            this.modalRef.hide();
          }, (err) => {
            console.log(err);
            this.error = err;
            this.isLoading = false;
          });
        break;
      case 'arrivee':
        this.arriveeColis.description = this.colisForm.value.description;
        this.colis.arriveeColis = this.arriveeColis;
        this.colisSubscription = this.colisService.addArriveeColis(this.colis)
          .subscribe((colis: Colis) => {
            let data = {
              type: this.type,
              suivi: this.suivi,
              colis: colis
            };
            this.isLoading = false;
            this.onClose.next(data);
            this.showSave('Arrivée enregistré avec succès');
            this.modalRef.hide();
          }, (err) => {
            console.log(err);
            this.error = err;
            this.isLoading = false;
          });
        break;
      case 'reception':
        this.receptionColis.description = this.colisForm.value.description;
        this.colis.receptionColis = this.receptionColis;
        this.colisSubscription = this.colisService.addReceptionColis(this.colis)
          .subscribe((colis: Colis) => {
            let data = {
              type: this.type,
              suivi: this.suivi,
              colis: colis
            };
            this.isLoading = false;
            this.onClose.next(data);
            this.showSave('Réception enregistré avec succès');
            this.modalRef.hide();
          }, (err) => {
            console.log(err);
            this.error = err;
            this.isLoading = false;
          });
        break;
      case 'livraison':
        this.livraisonColis.description = this.colisForm.value.description;
        this.colis.livraisonColis = this.livraisonColis;
        this.colisSubscription = this.colisService.addLivraisonColis(this.colis)
          .subscribe((colis: Colis) => {
            let data = {
              type: this.type,
              suivi: this.suivi,
              colis: colis
            };
            this.isLoading = false;
            this.onClose.next(data);
            this.showSave('Livraison enregistré avec succès');
            this.modalRef.hide();
          }, (err) => {
            console.log(err);
            this.error = err;
            this.isLoading = false;
          });
        break;
      default:
        console.log("Error");
        break;
    }
  }

  updateSuiviColis() {
    this.isLoading = true;
    switch(this.suivi){
      case 'enregistrement':
        this.colis.enregistrementColis.id = this.colisForm.getRawValue().id;
        this.colis.enregistrementColis.description = this.colisForm.getRawValue().description;
        this.colisSubscription = this.colisService.updateEnregistrementColis(this.colis)
          .subscribe((colis: Colis) => {
            let data = {
              type: this.type,
              colis: colis
            };
            this.isLoading = false;
            this.onClose.next(data);
            this.showUpdate('Enregistrement modifié avec succès');
            this.modalRef.hide();
          }, (err) => {
            console.log(err);
            this.error = err;
            this.isLoading = false;
          });
        break;
      case 'expedition':
        this.colis.expeditionColis.id = this.colisForm.getRawValue().id;
        this.colis.expeditionColis.description = this.colisForm.getRawValue().description;
        this.colisSubscription = this.colisService.updateExpeditionColis(this.colis)
          .subscribe((colis: Colis) => {
            let data = {
              type: this.type,
              colis: colis
            };
            this.isLoading = false;
            this.onClose.next(data);
            this.showUpdate('Expédition modifiée avec succès');
            this.modalRef.hide();
          }, (err) => {
            console.log(err);
            this.error = err;
            this.isLoading = false;
          });
        break;
      case 'arrivee':
        this.colis.arriveeColis.id = this.colisForm.getRawValue().id;
        this.colis.arriveeColis.description = this.colisForm.getRawValue().description;
        this.colisSubscription = this.colisService.updateArriveeColis(this.colis)
          .subscribe((colis: Colis) => {
            let data = {
              type: this.type,
              colis: colis
            };
            this.isLoading = false;
            this.onClose.next(data);
            this.showUpdate('Arrivée modifiée avec succès');
            this.modalRef.hide();
          }, (err) => {
            console.log(err);
            this.error = err;
            this.isLoading = false;
          });
        break;
      case 'reception':
        this.colis.receptionColis.id = this.colisForm.getRawValue().id;
        this.colis.receptionColis.description = this.colisForm.getRawValue().description;
        this.colisSubscription = this.colisService.updateReceptionColis(this.colis)
          .subscribe((colis: Colis) => {
            let data = {
              type: this.type,
              colis: colis
            };
            this.isLoading = false;
            this.onClose.next(data);
            this.showUpdate('Réception modifiée avec succès');
            this.modalRef.hide();
          }, (err) => {
            console.log(err);
            this.error = err;
            this.isLoading = false;
          });
        break;
      case 'livraison':
        this.colis.livraisonColis.id = this.colisForm.getRawValue().id;
        this.colis.livraisonColis.description = this.colisForm.getRawValue().description;
        this.colisSubscription = this.colisService.updateLivraisonColis(this.colis)
          .subscribe((colis: Colis) => {
            let data = {
              type: this.type,
              colis: colis
            };
            this.isLoading = false;
            this.onClose.next(data);
            this.showUpdate('livraison modifiée avec succès');
            this.modalRef.hide();
          }, (err) => {
            console.log(err);
            this.error = err;
            this.isLoading = false;
          });
        break;
      default:
        console.log("Error");
        break;
    }
  }

  dismiss(){
    this.error = "";
  }

  ngOnDestroy(){
    this.colisSubscription !== null ? this.colisSubscription.unsubscribe() : null;
  }

}
