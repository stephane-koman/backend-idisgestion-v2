import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ReglementService} from '../../services/reglement/reglement.service';
import {Subject, Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Reglement} from '../../models/reglement/reglement';

@Component({
  selector: 'app-modal-remove-reglement',
  templateUrl: './modal-remove-reglement.component.html',
  styleUrls: ['./modal-remove-reglement.component.scss']
})
export class ModalRemoveReglementComponent implements OnInit {

  public reglement: Reglement = new Reglement();
  reglementSubscription: Subscription =null;

  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private reglementService: ReglementService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, reglement: Reglement): void {
    this.type = type;
    this.reglement =  reglement;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.reglementSubscription = this.reglementService.disableReglement(this.reglement)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            reglement: this.reglement
          };
          this.showDisable("Reglement désactivé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.reglementSubscription = this.reglementService.removeReglement(this.reglement)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            reglement: this.reglement
          };
          this.showRemove("Reglement supprimé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.reglementSubscription = this.reglementService.enableReglement(this.reglement)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            reglement: this.reglement
          };
          this.showEnable("Reglement activé avec succès");
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
    this.reglementSubscription !== null ? this.reglementSubscription.unsubscribe() : null;
  }


}
