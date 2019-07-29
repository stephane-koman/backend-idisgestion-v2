import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Devise} from '../../models/devise/devise';
import {DeviseService} from '../../services/devise/devise.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-modal-devise',
  templateUrl: './modal-devise.component.html',
  styleUrls: ['./modal-devise.component.scss']
})
export class ModalDeviseComponent implements OnInit, OnDestroy {
  devise: Devise = new Devise();
  deviseSubscription: Subscription = null;
  public type: string;
  deviseForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = "";
  alert: any = {
    type: "danger",
    dismissible: true
  };

  constructor(private deviseService: DeviseService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.createForm();
  }

  public showDeviseModal(type: string, devise: Devise): void {
    this.type = type;
    if (devise !== null) {
      this.deviseForm.setValue({
        id: devise.id || '',
        nomDevise: devise.nomDevise || '',
        description: devise.description || '',
      });

      let id = this.deviseForm.get('id');
      let nomDevise = this.deviseForm.get('nomDevise');
      let description = this.deviseForm.get('description');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's') ? nomDevise.disable() : nomDevise.enable();
      (this.type === 's') ? description.disable() : description.enable();

    }

  }

  createForm() {

    this.deviseForm = this.fb.group({
      id: new FormControl(''),
      nomDevise: new FormControl(this.devise.nomDevise, [Validators.required]),
      description: new FormControl(this.devise.description)
    });

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveDevise();
    }
    if (this.type === 'u') {
      this.updateDevise();
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

  saveDevise() {
    this.isLoading = true;
    this.devise.nomDevise = this.deviseForm.value.nomDevise;
    this.devise.description = this.deviseForm.value.description;

    this.deviseSubscription = this.deviseService.addDevise(this.devise)
      .subscribe((devise: Devise) => {
        let data = {
          type: this.type,
          devise: devise
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('Devise enregistrée avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateDevise() {
    this.isLoading = true;
    this.devise.id = this.deviseForm.getRawValue().id;
    this.devise.nomDevise = this.deviseForm.getRawValue().nomDevise;
    this.devise.description = this.deviseForm.getRawValue().description;

    this.deviseSubscription = this.deviseService.updateDevise(this.devise)
      .subscribe((devise: Devise) => {
        let data = {
          type: this.type,
          devise: devise
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('Devise modifiée avec succès');
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
    this.deviseSubscription !== null ? this.deviseSubscription.unsubscribe() : null;
  }

}
