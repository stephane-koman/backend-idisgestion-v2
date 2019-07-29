import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {TypeFacture} from '../../models/type-facture/type-facture';
import {TypeFactureService} from '../../services/type-facture/type-facture.service';

@Component({
  selector: 'app-modal-remove-type-facture',
  templateUrl: './modal-remove-type-facture.component.html',
  styleUrls: ['./modal-remove-type-facture.component.scss']
})
export class ModalRemoveTypeFactureComponent implements OnInit, OnDestroy {

  public typeFacture: TypeFacture = new TypeFacture();
  typeFactureSubscription: Subscription = null;
  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private typeFactureService: TypeFactureService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, typeFacture: TypeFacture): void {
    this.type = type;
    this.typeFacture =  typeFacture;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.typeFactureSubscription = this.typeFactureService.disableTypeFacture(this.typeFacture)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            typeFacture: this.typeFacture
          };
          this.showDisable("Type Facture désactivé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.typeFactureSubscription = this.typeFactureService.removeTypeFacture(this.typeFacture)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            typeFacture: this.typeFacture
          };
          this.showRemove("Type Facture supprimé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.typeFactureSubscription = this.typeFactureService.enableTypeFacture(this.typeFacture)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            typeFacture: this.typeFacture
          };
          this.showEnable("Type Facture activé avec succès");
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
    this.typeFactureSubscription !== null ? this.typeFactureSubscription.unsubscribe() : null;
  }

}
