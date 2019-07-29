import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs/Subject';
import {Fonction} from '../../models/fonction/fonction';
import {FonctionService} from '../../services/fonction/fonction.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-modal-fonction',
  templateUrl: './modal-fonction.component.html',
  styleUrls: ['./modal-fonction.component.scss']
})
export class ModalFonctionComponent implements OnInit, OnDestroy {
  public fonction: Fonction = new Fonction();
  fonctionSubscription: Subscription = null;
  public type: string;
  fonctionForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = "";
  alert: any = {
    type: "danger",
    dismissible: true
  };

  constructor(private fonctionService: FonctionService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.createForm();
  }

  public showFonctionModal(type: string, fonction: Fonction): void {
    this.type = type;
    if (fonction !== null) {
      this.fonctionForm.setValue({
        id: fonction.id || '',
        nomFonction: fonction.nomFonction || '',
        description: fonction.description || '',
      });

      let id = this.fonctionForm.get('id');
      let nomFonction = this.fonctionForm.get('nomFonction');
      let description = this.fonctionForm.get('description');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's') ? nomFonction.disable() : nomFonction.enable();
      (this.type === 's') ? description.disable() : description.enable();

    }

  }

  createForm() {

    this.fonctionForm = this.fb.group({
      id: new FormControl(''),
      nomFonction: new FormControl(this.fonction.nomFonction, [Validators.required, Validators.minLength(2)]),
      description: new FormControl(this.fonction.description)
    });

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveFonction();
    }
    if (this.type === 'u') {
      this.updateFonction();
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

  saveFonction() {
    this.isLoading = true;
    this.fonction.nomFonction = this.fonctionForm.value.nomFonction;
    this.fonction.description = this.fonctionForm.value.description;

    this.fonctionSubscription = this.fonctionService.addFonction(this.fonction)
      .subscribe((fonction: Fonction) => {
        let data = {
          type: this.type,
          fonction: fonction
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('Fonction enregistrée avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateFonction() {
    this.isLoading = true;
    this.fonction.id = this.fonctionForm.getRawValue().id;
    this.fonction.nomFonction = this.fonctionForm.getRawValue().nomFonction;
    this.fonction.description = this.fonctionForm.getRawValue().description;

    this.fonctionSubscription = this.fonctionService.updateFonction(this.fonction)
      .subscribe((fonction: Fonction) => {
        let data = {
          type: this.type,
          fonction: fonction
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('Fonction modifiée avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  dismiss(){
    this.error = "";
  }

  ngOnDestroy(){
    this.fonctionSubscription !== null ? this.fonctionSubscription.unsubscribe() : null;
  }

}
