import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {Pays} from '../../models/pays/pays';
import {PaysService} from '../../services/pays/pays.service';

@Component({
  selector: 'app-modal-remove-pays',
  templateUrl: './modal-remove-pays.component.html',
  styleUrls: ['./modal-remove-pays.component.scss']
})
export class ModalRemovePaysComponent implements OnInit, OnDestroy {

  public pays: Pays = new Pays();
  paysSubscription: Subscription = null;
  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private paysService: PaysService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, pays: Pays): void {
    this.type = type;
    this.pays =  pays;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.paysSubscription = this.paysService.disablePays(this.pays)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            pays: this.pays
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
      this.paysSubscription = this.paysService.removePays(this.pays)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            pays: this.pays
          };
          this.showRemove("Pays supprimé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.paysSubscription = this.paysService.enablePays(this.pays)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            pays: this.pays
          };
          this.showEnable("Pays activé avec succès");
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
    this.paysSubscription !== null ? this.paysSubscription.unsubscribe() : null;
  }

}
