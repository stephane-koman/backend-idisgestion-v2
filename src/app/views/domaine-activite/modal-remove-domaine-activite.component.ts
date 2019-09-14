import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {DomaineActivite} from '../../models/domaine-activite/domaine-activite';
import {DomaineActiviteService} from '../../services/domaine-activite/domaine-activite.service';

@Component({
  selector: 'app-modal-remove-pays',
  templateUrl: './modal-remove-domaine-activite.component.html',
  styleUrls: ['./modal-remove-domaine-activite.component.scss']
})
export class ModalRemoveDomaineActiviteComponent implements OnInit, OnDestroy {

  public domaineActivite: DomaineActivite = new DomaineActivite();
  domaineActiviteSubscription: Subscription = null;
  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private domaineActiviteService: DomaineActiviteService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, domaineActivite: DomaineActivite): void {
    this.type = type;
    this.domaineActivite =  domaineActivite;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.domaineActiviteSubscription = this.domaineActiviteService.disableDomaineActivite(this.domaineActivite)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            domaineActivite: this.domaineActivite
          };
          this.showDisable("Pays désactivé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.domaineActiviteSubscription = this.domaineActiviteService.removeDomaineActivite(this.domaineActivite)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            domaineActivite: this.domaineActivite
          };
          this.showRemove("Domaine d\'activité supprimé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.domaineActiviteSubscription = this.domaineActiviteService.enableDomaineActivite(this.domaineActivite)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            domaineActivite: this.domaineActivite
          };
          this.showEnable("Domaine d\'activité activé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

  }

  showEnable(msg: string) {
    this.toastr.success(msg, "Activation", {
      closeButton: true,
      timeOut: 3000,
    });
  }

  showDisable(msg: string) {
    this.toastr.error(msg, "Désactivation", {
      closeButton: true,
      timeOut: 3000,
    });
  }
  showRemove(msg: string) {
    this.toastr.error(msg, "Suppression", {
      closeButton: true,
      timeOut: 3000,
    });
  }

  close(){
    this.modalRef.hide();
  }

  ngOnDestroy(){
    this.domaineActiviteSubscription !== null ? this.domaineActiviteSubscription.unsubscribe() : null;
  }

}
