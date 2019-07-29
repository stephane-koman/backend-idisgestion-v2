import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {TypeFacture} from '../../models/type-facture/type-facture';
import {TypeFactureService} from '../../services/type-facture/type-facture.service';

@Component({
  selector: 'app-modal-type-facture',
  templateUrl: './modal-type-facture.component.html',
  styleUrls: ['./modal-type-facture.component.scss']
})
export class ModalTypeFactureComponent implements OnInit, OnDestroy {
  typeFacture: TypeFacture = new TypeFacture();
  typeFactureSubscription: Subscription = null;
  public type: string;
  typeFactureForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = "";
  alert: any = {
    type: "danger",
    dismissible: true
  };

  constructor(private typeFactureService: TypeFactureService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.createForm();
  }

  public showTypeFactureModal(type: string, typeFacture: TypeFacture): void {
    this.type = type;
    if (typeFacture !== null) {
      this.typeFactureForm.setValue({
        id: typeFacture.id || '',
        nomTypeFacture: typeFacture.nomTypeFacture || '',
        description: typeFacture.description || '',
      });

      let id = this.typeFactureForm.get('id');
      let nomTypeFacture = this.typeFactureForm.get('nomTypeFacture');
      let description = this.typeFactureForm.get('description');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's') ? nomTypeFacture.disable() : nomTypeFacture.enable();
      (this.type === 's') ? description.disable() : description.enable();

    }

  }

  createForm() {

    this.typeFactureForm = this.fb.group({
      id: new FormControl(''),
      nomTypeFacture: new FormControl(this.typeFacture.nomTypeFacture, [Validators.required, Validators.minLength(4)]),
      description: new FormControl(this.typeFacture.description)
    });

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveTypeFacture();
    }
    if (this.type === 'u') {
      this.updateTypeFacture();
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

  saveTypeFacture() {
    this.isLoading = true;
    this.typeFacture.nomTypeFacture = this.typeFactureForm.value.nomTypeFacture;
    this.typeFacture.description = this.typeFactureForm.value.description;

    this.typeFactureSubscription = this.typeFactureService.addTypeFacture(this.typeFacture)
      .subscribe((typeFacture: TypeFacture) => {
        let data = {
          type: this.type,
          typeFacture: typeFacture
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('TypeFacture enregistré avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateTypeFacture() {
    this.isLoading = true;
    this.typeFacture.id = this.typeFactureForm.getRawValue().id;
    this.typeFacture.nomTypeFacture = this.typeFactureForm.getRawValue().nomTypeFacture;
    this.typeFacture.description = this.typeFactureForm.getRawValue().description;

    this.typeFactureSubscription = this.typeFactureService.updateTypeFacture(this.typeFacture)
      .subscribe((typeFacture: TypeFacture) => {
        let data = {
          type: this.type,
          typeFacture: typeFacture
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('TypeFacture modifié avec succès');
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
    this.typeFactureSubscription !== null ? this.typeFactureSubscription.unsubscribe() : null;
  }

}
