import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {TypeReglement} from '../../models/type-reglement/type-reglement';
import {TypeReglementService} from '../../services/type-reglement/type-reglement.service';

@Component({
  selector: 'app-modal-type-reglement',
  templateUrl: './modal-type-reglement.component.html',
  styleUrls: ['./modal-type-reglement.component.scss']
})
export class ModalTypeReglementComponent implements OnInit, OnDestroy {
  typeReglement: TypeReglement = new TypeReglement();
  typeReglementSubscription: Subscription = null;
  public type: string;
  typeReglementForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = "";
  alert: any = {
    type: "danger",
    dismissible: true
  };

  constructor(private typeReglementService: TypeReglementService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.createForm();
  }

  public showTypeReglementModal(type: string, typeReglement: TypeReglement): void {
    this.type = type;
    if (typeReglement !== null) {
      this.typeReglementForm.setValue({
        id: typeReglement.id || '',
        nomTypeReglement: typeReglement.nomTypeReglement || '',
        description: typeReglement.description || '',
      });

      let id = this.typeReglementForm.get('id');
      let nomTypeReglement = this.typeReglementForm.get('nomTypeReglement');
      let description = this.typeReglementForm.get('description');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's') ? nomTypeReglement.disable() : nomTypeReglement.enable();
      (this.type === 's') ? description.disable() : description.enable();

    }

  }

  createForm() {

    this.typeReglementForm = this.fb.group({
      id: new FormControl(''),
      nomTypeReglement: new FormControl(this.typeReglement.nomTypeReglement, [Validators.required, Validators.minLength(4)]),
      description: new FormControl(this.typeReglement.description)
    });

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveTypeReglement();
    }
    if (this.type === 'u') {
      this.updateTypeReglement();
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

  saveTypeReglement() {
    this.isLoading = true;
    this.typeReglement.nomTypeReglement = this.typeReglementForm.value.nomTypeReglement;
    this.typeReglement.description = this.typeReglementForm.value.description;

    this.typeReglementSubscription = this.typeReglementService.addTypeReglement(this.typeReglement)
      .subscribe((typeReglement: TypeReglement) => {
        let data = {
          type: this.type,
          typeReglement: typeReglement
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('TypeReglement enregistré avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateTypeReglement() {
    this.isLoading = true;
    this.typeReglement.id = this.typeReglementForm.getRawValue().id;
    this.typeReglement.nomTypeReglement = this.typeReglementForm.getRawValue().nomTypeReglement;
    this.typeReglement.description = this.typeReglementForm.getRawValue().description;

    this.typeReglementSubscription = this.typeReglementService.updateTypeReglement(this.typeReglement)
      .subscribe((typeReglement: TypeReglement) => {
        let data = {
          type: this.type,
          typeReglement: typeReglement
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('TypeReglement modifié avec succès');
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
    this.typeReglementSubscription !== null ? this.typeReglementSubscription.unsubscribe() : null;
  }

}
