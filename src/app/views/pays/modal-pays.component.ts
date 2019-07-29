import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {Pays} from '../../models/pays/pays';
import {PaysService} from '../../services/pays/pays.service';

@Component({
  selector: 'app-modal-pays',
  templateUrl: './modal-pays.component.html',
  styleUrls: ['./modal-pays.component.scss']
})
export class ModalPaysComponent implements OnInit, OnDestroy {
  pays: Pays = new Pays();
  paysSubscription: Subscription = null;
  public type: string;
  paysForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = "";
  alert: any = {
    type: "danger",
    dismissible: true
  };

  constructor(private paysService: PaysService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.createForm();
  }

  public showPaysModal(type: string, pays: Pays): void {
    this.type = type;
    if (pays !== null) {
      this.paysForm.setValue({
        id: pays.id || '',
        nomPays: pays.nomPays || '',
        description: pays.description || '',
      });

      let id = this.paysForm.get('id');
      let nomPays = this.paysForm.get('nomPays');
      let description = this.paysForm.get('description');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's') ? nomPays.disable() : nomPays.enable();
      (this.type === 's') ? description.disable() : description.enable();

    }

  }

  createForm() {

    this.paysForm = this.fb.group({
      id: new FormControl(''),
      nomPays: new FormControl(this.pays.nomPays, [Validators.required, Validators.minLength(4)]),
      description: new FormControl(this.pays.description)
    });

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.savePays();
    }
    if (this.type === 'u') {
      this.updatePays();
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

  savePays() {
    this.isLoading = true;
    this.pays.nomPays = this.paysForm.value.nomPays;
    this.pays.description = this.paysForm.value.description;

    this.paysSubscription = this.paysService.addPays(this.pays)
      .subscribe((pays: Pays) => {
        let data = {
          type: this.type,
          pays: pays
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('Pays enregistré avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updatePays() {
    this.isLoading = true;
    this.pays.id = this.paysForm.getRawValue().id;
    this.pays.nomPays = this.paysForm.getRawValue().nomPays;
    this.pays.description = this.paysForm.getRawValue().description;

    this.paysSubscription = this.paysService.updatePays(this.pays)
      .subscribe((pays: Pays) => {
        let data = {
          type: this.type,
          pays: pays
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('Pays modifié avec succès');
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
    this.paysSubscription !== null ? this.paysSubscription.unsubscribe() : null;
  }

}
