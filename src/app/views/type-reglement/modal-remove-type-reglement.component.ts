import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {TypeReglement} from '../../models/type-reglement/type-reglement';
import {TypeReglementService} from '../../services/type-reglement/type-reglement.service';

@Component({
  selector: 'app-modal-remove-type-reglement',
  templateUrl: './modal-remove-type-reglement.component.html',
  styleUrls: ['./modal-remove-type-reglement.component.scss']
})
export class ModalRemoveTypeReglementComponent implements OnInit, OnDestroy {

  public typeReglement: TypeReglement = new TypeReglement();
  typeReglementSubscription: Subscription = null;
  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private typeReglementService: TypeReglementService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, typeReglement: TypeReglement): void {
    this.type = type;
    this.typeReglement =  typeReglement;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.typeReglementSubscription = this.typeReglementService.disableTypeReglement(this.typeReglement)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            typeReglement: this.typeReglement
          };
          this.showDisable("Type Reglement désactivé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.typeReglementSubscription = this.typeReglementService.removeTypeReglement(this.typeReglement)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            typeReglement: this.typeReglement
          };
          this.showRemove("Type Reglement supprimé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.typeReglementSubscription = this.typeReglementService.enableTypeReglement(this.typeReglement)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            typeReglement: this.typeReglement
          };
          this.showEnable("Type Reglement activé avec succès");
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
    this.typeReglementSubscription !== null ? this.typeReglementSubscription.unsubscribe() : null;
  }

}
