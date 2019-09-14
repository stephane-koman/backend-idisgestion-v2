import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {DomaineActivite} from '../../models/domaine-activite/domaine-activite';
import {DomaineActiviteService} from '../../services/domaine-activite/domaine-activite.service';

@Component({
  selector: 'app-modal-pays',
  templateUrl: './modal-domaine-activite.component.html',
  styleUrls: ['./modal-domaine-activite.component.scss']
})
export class ModalDomaineActiviteComponent implements OnInit, OnDestroy {
  domaineActivite: DomaineActivite = new DomaineActivite();
  domaineActiviteSubscription: Subscription = null;
  public type: string;
  domaineActiviteForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = "";
  alert: any = {
    type: "danger",
    dismissible: true
  };

  constructor(private domaineActiviteService: DomaineActiviteService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.createForm();
  }

  public showDomaineActiviteModal(type: string, domaineActivite: DomaineActivite): void {
    this.type = type;
    if (domaineActivite !== null) {
      this.domaineActiviteForm.setValue({
        id: domaineActivite.id || '',
        code: domaineActivite.code || '',
        libelle: domaineActivite.libelle || '',
      });

      let id = this.domaineActiviteForm.get('id');
      let code = this.domaineActiviteForm.get('code');
      let libelle = this.domaineActiviteForm.get('libelle');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's') ? code.disable() : code.enable();
      (this.type === 's') ? libelle.disable() : libelle.enable();

    }

  }

  createForm() {

    this.domaineActiviteForm = this.fb.group({
      id: new FormControl(''),
      code: new FormControl(this.domaineActivite.code, [Validators.required, Validators.minLength(4)]),
      libelle: new FormControl(this.domaineActivite.libelle)
    });

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveDomaineActivite();
    }
    if (this.type === 'u') {
      this.updateDomaineActivite();
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

  saveDomaineActivite() {
    this.isLoading = true;
    this.domaineActivite.code = this.domaineActiviteForm.value.code;
    this.domaineActivite.libelle = this.domaineActiviteForm.value.libelle;

    this.domaineActiviteSubscription = this.domaineActiviteService.addDomaineActivite(this.domaineActivite)
      .subscribe((domaineActivite: DomaineActivite) => {
        let data = {
          type: this.type,
          domaineActivite: domaineActivite
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('Domaine d\'activité enregistré avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateDomaineActivite() {
    this.isLoading = true;
    this.domaineActivite.id = this.domaineActiviteForm.getRawValue().id;
    this.domaineActivite.code = this.domaineActiviteForm.getRawValue().code;
    this.domaineActivite.libelle = this.domaineActiviteForm.getRawValue().libelle;

    this.domaineActiviteSubscription = this.domaineActiviteService.updateDomaineActivite(this.domaineActivite)
      .subscribe((domaineActivite: DomaineActivite) => {
        let data = {
          type: this.type,
          domaineActivite: domaineActivite
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('Domaine d\'activité modifié avec succès');
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
    this.domaineActiviteSubscription !== null ? this.domaineActiviteSubscription.unsubscribe() : null;
  }

}
