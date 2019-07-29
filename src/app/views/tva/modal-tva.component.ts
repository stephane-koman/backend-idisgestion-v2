import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {Tva} from '../../models/tva/tva';
import {TvaService} from '../../services/tva/tva.service';

@Component({
  selector: 'app-modal-tva',
  templateUrl: './modal-tva.component.html',
  styleUrls: ['./modal-tva.component.scss']
})
export class ModalTvaComponent implements OnInit, OnDestroy {
  tva: Tva = new Tva();
  tvaSubscription: Subscription = null;
  public type: string;
  tvaForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = "";
  alert: any = {
    type: "danger",
    dismissible: true
  };

  constructor(private tvaService: TvaService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.createForm();
  }

  public showTvaModal(type: string, tva: Tva): void {
    this.type = type;
    if (tva !== null) {
      this.tvaForm.setValue({
        id: tva.id || '',
        valeurTva: tva.valeurTva || '',
        description: tva.description || '',
      });

      let id = this.tvaForm.get('id');
      let valeurTva = this.tvaForm.get('valeurTva');
      let description = this.tvaForm.get('description');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's') ? valeurTva.disable() : valeurTva.enable();
      (this.type === 's') ? description.disable() : description.enable();

    }

  }

  createForm() {

    this.tvaForm = this.fb.group({
      id: new FormControl(''),
      valeurTva: new FormControl(this.tva.valeurTva, [Validators.required]),
      description: new FormControl(this.tva.description)
    });

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveTva();
    }
    if (this.type === 'u') {
      this.updateTva();
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

  saveTva() {
    this.isLoading = true;
    this.tva.valeurTva = this.tvaForm.value.valeurTva;
    this.tva.description = this.tvaForm.value.description;

    this.tvaSubscription = this.tvaService.addTva(this.tva)
      .subscribe((tva: Tva) => {
        let data = {
          type: this.type,
          tva: tva
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('Tva enregistrée avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateTva() {
    this.isLoading = true;
    this.tva.id = this.tvaForm.getRawValue().id;
    this.tva.valeurTva = this.tvaForm.getRawValue().valeurTva;
    this.tva.description = this.tvaForm.getRawValue().description;

    this.tvaSubscription = this.tvaService.updateTva(this.tva)
      .subscribe((tva: Tva) => {
        let data = {
          type: this.type,
          tva: tva
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('Tva modifiée avec succès');
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
    this.tvaSubscription !== null ? this.tvaSubscription.unsubscribe() : null;
  }

}
