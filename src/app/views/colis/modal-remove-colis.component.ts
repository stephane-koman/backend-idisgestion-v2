import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ColisService} from '../../services/colis/colis.service';
import {Subject} from 'rxjs';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Colis} from '../../models/colis/colis';

@Component({
  selector: 'app-modal-remove-colis',
  templateUrl: './modal-remove-colis.component.html',
  styleUrls: ['./modal-remove-colis.component.scss']
})
export class ModalRemoveColisComponent implements OnInit {

  public colis: Colis = new Colis();
  colisSubscription: Subscription =null;

  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private colisService: ColisService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, colis: Colis): void {
    this.type = type;
    this.colis =  colis;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.colisSubscription = this.colisService.disableColis(this.colis)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            colis: this.colis
          };
          this.showDisable("Colis désactivé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.colisSubscription = this.colisService.removeColis(this.colis)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            colis: this.colis
          };
          this.showRemove("Colis supprimé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.colisSubscription = this.colisService.enableColis(this.colis)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            colis: this.colis
          };
          this.showEnable("Colis activé avec succès");
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
    this.colisSubscription !== null ? this.colisSubscription.unsubscribe() : null;
  }


}
